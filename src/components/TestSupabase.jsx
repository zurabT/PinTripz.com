// Create a new file: TestSupabase.jsx
import { useEffect, useState } from 'react';
import supabase from './supabaseClient';

function TestSupabase() {
  const [connectionStatus, setConnectionStatus] = useState('testing...');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('🔍 Testing Supabase connection...');
      
      // Test 1: Basic connection
      const { data: testData, error: testError } = await supabase
        .from('airportsdataV2')
        .select('*')
        .limit(2);

      console.log('📊 Test result:', { testData, testError });

      if (testError) {
        setConnectionStatus('❌ Connection failed');
        setError(testError.message);
        console.error('Supabase error:', testError);
        
        // Check for specific error codes
        if (testError.code === 'PGRST116') {
          console.error('❌ Table "airportsdataV2" does not exist');
        } else if (testError.code === '42P01') {
          console.error('❌ Table not found - check table name');
        }
      } else if (testData) {
        setConnectionStatus('✅ Connected successfully');
        setData(testData);
        console.log('✅ Data received:', testData);
      } else {
        setConnectionStatus('⚠️ No data returned');
      }

    } catch (err) {
      setConnectionStatus('❌ Connection failed completely');
      setError(err.message);
      console.error('General error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid red', margin: '10px' }}>
      <h3>Supabase Connection Test</h3>
      <p>Status: <strong>{connectionStatus}</strong></p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div>
          <p>Data sample:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      <button onClick={testConnection}>Test Again</button>
    </div>
  );
}

export default TestSupabase;