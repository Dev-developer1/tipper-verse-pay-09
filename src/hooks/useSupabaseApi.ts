import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseApi = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const makeRequest = async (functionName: string, payload?: any, method: 'GET' | 'POST' = 'POST') => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const headers: Record<string, string> = {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      };

      const options: RequestInit = {
        method,
        headers,
      };

      if (method === 'POST' && payload) {
        options.body = JSON.stringify(payload);
      }

      const { data, error } = await supabase.functions.invoke(functionName, {
        body: payload,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        }
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error(`Error calling ${functionName}:`, error);
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const lookupMerchant = async (qrCode?: string, phoneNumber?: string) => {
    return makeRequest('lookup-merchant', { qr_code: qrCode, phone_number: phoneNumber });
  };

  const processTip = async (merchantId: string, amount: number, message?: string, paymentMethod: string = 'upi') => {
    return makeRequest('process-tip', {
      merchant_id: merchantId,
      amount,
      message,
      payment_method: paymentMethod
    });
  };

  const getUserTransactions = async (limit: number = 10, offset: number = 0) => {
    return makeRequest('get-user-transactions', null, 'GET');
  };

  return {
    loading,
    lookupMerchant,
    processTip,
    getUserTransactions
  };
};