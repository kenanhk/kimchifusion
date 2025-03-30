import { createClient } from '@supabase/supabase-js';
import { Database } from '../types';
import { PostgrestError } from '@supabase/postgrest-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Function to test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('count')
      .limit(1) as { data: any; error: PostgrestError | null };
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
};

// Function to get client IP address
const getClientIp = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return 'unknown';
  }
};

// Create Supabase client
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

// Export a wrapped version of supabase that includes IP
export const supabaseWithIp = {
  ...supabase,
  from: (table: string) => {
    // @ts-ignore - Supabase types don't include this property
    supabase.rest.headers['X-Client-IP'] = 'unknown'; // Will be updated before each request
    return supabase.from(table);
  },
};

export default supabaseWithIp; 