import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
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

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Get user transactions with merchant details
    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select(`
        id,
        amount,
        message,
        status,
        payment_method,
        payment_reference,
        created_at,
        merchants (
          name,
          category,
          location
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (transactionsError) {
      throw transactionsError;
    }

    // Get user stats
    const { data: stats } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', user.id)
      .eq('status', 'completed');

    const totalTipped = stats?.reduce((sum, t) => sum + t.amount, 0) || 0;
    const merchantsCount = new Set(transactions?.map(t => t.merchants?.name)).size;

    console.log(`Retrieved ${transactions?.length} transactions for user ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        transactions: transactions?.map(t => ({
          id: t.id,
          merchant: t.merchants?.name || 'Unknown',
          amount: t.amount,
          date: new Date(t.created_at).toLocaleString(),
          status: t.status,
          type: 'Merchant',
          category: t.merchants?.category,
          location: t.merchants?.location,
          payment_reference: t.payment_reference,
          message: t.message
        })) || [],
        stats: {
          total_tipped: totalTipped,
          merchants_count: merchantsCount
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error getting user transactions:', error);
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