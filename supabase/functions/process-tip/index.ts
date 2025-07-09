import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TipRequest {
  merchant_id: string;
  amount: number;
  message?: string;
  payment_method: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid token');
    }

    const { merchant_id, amount, message, payment_method }: TipRequest = await req.json();

    // Validate input
    if (!merchant_id || !amount || amount <= 0) {
      throw new Error('Invalid input data');
    }

    // Get merchant details
    const { data: merchant, error: merchantError } = await supabase
      .from('merchants')
      .select('*')
      .eq('id', merchant_id)
      .single();

    if (merchantError || !merchant) {
      throw new Error('Merchant not found');
    }

    // Calculate commission
    const platform_commission = amount * 0.03; // 3% platform commission
    const merchant_amount = amount - platform_commission;

    // Create transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        merchant_id,
        amount,
        platform_commission,
        merchant_amount,
        message,
        payment_method,
        status: 'completed',
        payment_reference: `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      })
      .select()
      .single();

    if (transactionError) {
      throw transactionError;
    }

    // Update merchant stats
    await supabase
      .from('merchants')
      .update({
        total_tips_received: merchant.total_tips_received + amount,
        tips_count: merchant.tips_count + 1
      })
      .eq('id', merchant_id);

    // Create/update daily analytics
    const today = new Date().toISOString().split('T')[0];
    
    const { data: existingAnalytics } = await supabase
      .from('daily_analytics')
      .select('*')
      .eq('date', today)
      .eq('merchant_id', merchant_id)
      .single();

    if (existingAnalytics) {
      await supabase
        .from('daily_analytics')
        .update({
          total_tips: existingAnalytics.total_tips + amount,
          tips_count: existingAnalytics.tips_count + 1,
          commission_earned: existingAnalytics.commission_earned + platform_commission
        })
        .eq('id', existingAnalytics.id);
    } else {
      await supabase
        .from('daily_analytics')
        .insert({
          merchant_id,
          date: today,
          total_tips: amount,
          tips_count: 1,
          commission_earned: platform_commission
        });
    }

    console.log('Tip processed successfully:', transaction.id);

    return new Response(
      JSON.stringify({
        success: true,
        transaction_id: transaction.id,
        amount,
        merchant_name: merchant.name,
        payment_reference: transaction.payment_reference
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error processing tip:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);