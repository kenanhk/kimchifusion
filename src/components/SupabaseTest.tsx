import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const SupabaseTest = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test the connection using auth.getSession()
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        setStatus('success');
        setMessage('Supabase connection successful!');
      } catch (error) {
        console.error('Supabase connection error:', error);
        setStatus('error');
        setMessage('Failed to connect to Supabase. Check console for details.');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Supabase Connection Test</h2>
      <div className={`p-4 rounded-md ${
        status === 'loading' ? 'bg-gray-100' :
        status === 'success' ? 'bg-green-100' :
        'bg-red-100'
      }`}>
        <p className={`font-medium ${
          status === 'loading' ? 'text-gray-700' :
          status === 'success' ? 'text-green-700' :
          'text-red-700'
        }`}>
          {status === 'loading' ? 'Testing connection...' : message}
        </p>
      </div>
    </div>
  );
};

export default SupabaseTest; 