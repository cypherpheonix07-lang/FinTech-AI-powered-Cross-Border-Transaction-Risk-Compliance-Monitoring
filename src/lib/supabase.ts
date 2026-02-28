import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          user_id: string;
          transaction_id: string;
          amount: number;
          currency: string;
          recipient: string;
          status: 'pending' | 'processing' | 'completed' | 'failed';
          created_at: string;
          path_data: PathHop[];
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>;
      };
    };
  };
};

export type PathHop = {
  id: string;
  name: string;
  type: 'sender' | 'bank' | 'gateway' | 'receiver';
  timestamp: string;
  status: 'verified' | 'pending' | 'encrypted';
  location?: string;
  verificationProof?: string;
};
