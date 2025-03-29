import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const SupabaseTest = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        setStatus('success');
      } catch (err) {
        console.error('Supabase connection error:', err);
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to connect to Supabase');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="text-center py-4">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Status:</h2>
      {status === 'loading' && (
        <div className="text-blue-600">Checking connection...</div>
      )}
      {status === 'success' && (
        <div className="text-green-600">Successfully connected to Supabase!</div>
      )}
      {status === 'error' && (
        <div className="text-red-600">
          Failed to connect to Supabase: {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SupabaseTest; 