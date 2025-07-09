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

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { qr_code, phone_number } = await req.json();

    let merchant = null;

    if (qr_code) {
      // Look up merchant by QR code
      const { data, error } = await supabase
        .from('merchants')
        .select('id, name, category, verified, location, profile_image')
        .eq('qr_code', qr_code)
        .eq('status', 'active')
        .single();

      if (error) {
        throw new Error('Merchant not found');
      }
      merchant = data;
    } else if (phone_number) {
      // Look up merchant by phone number
      const { data, error } = await supabase
        .from('merchants')
        .select('id, name, category, verified, location, profile_image')
        .eq('phone', phone_number)
        .eq('status', 'active')
        .single();

      if (error) {
        throw new Error('Merchant not found');
      }
      merchant = data;
    } else {
      throw new Error('Either QR code or phone number is required');
    }

    console.log('Merchant found:', merchant.id);

    return new Response(
      JSON.stringify({
        success: true,
        merchant: {
          id: merchant.id,
          name: merchant.name,
          category: merchant.category,
          verified: merchant.verified,
          location: merchant.location,
          photo: merchant.profile_image || '🏪'
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error looking up merchant:', error);
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