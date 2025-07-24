import React, { useState } from 'react';

const BACKEND_URL = 'https://railway.com/project/f7c6ecec-b31d-41a6-8d6e-acccfa7e9fc2/service/c447672a-ad6f-4082-a1b1-a1ad4f237fe7?environmentId=10e9a973-1dd8-4979-a07b-feda0d044a92'; // Replace with your Railway URL

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateApp = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() })
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate app. Check console for details.');
    }
    setLoading(false);
  };

  const copyLink = () => {
    const fullUrl = `${BACKEND_URL}${result.share_url}`;
    navigator.clipboard.writeText(fullUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🧠 Vibe Coding</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Build web apps from natural language prompts</p>
      
      <div style={{ marginBottom: '20px' }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the app you want to build... (e.g., 'A todo list with local storage' or 'A random quote generator')"
          style={{
            width: '100%',
            height: '100px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif'
          }}
        />
        <button
          onClick={generateApp}
          disabled={loading || !prompt.trim()}
          style={{
            marginTop: '10px',
            padding: '12px 24px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Generating...' : 'Generate App'}
        </button>
      </div>

      {result && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <div style={{ flex: 1 }}>
            <h3>Generated Code:</h3>
            <pre style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '6px',
              overflow: 'auto',
              maxHeight: '400px',
              fontSize: '12px'
            }}>
              {result.code}
            </pre>
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Live Preview:</h3>
              <button
                onClick={copyLink}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Copy Share Link
              </button>
            </div>
            <iframe
              src={`${BACKEND_URL}${result.share_url}`}
              style={{
                width: '100%',
                height: '400px',
                border: '1px solid #ddd',
                borderRadius: '6px'
              }}
              title="Generated App Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
