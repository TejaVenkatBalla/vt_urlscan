import React, { useState } from 'react';

function MyComponent() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'x-apikey': 'ee9a95de89da158a7983bfe95d3f54d5027a0f951d4b16ab0438bb04e25285f6',
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        url: 'https://www.youtube.com/results?search_query=how+to+create+a+proxy+server'
      })
    };

    try {
      const response = await fetch('https://www.virustotal.com/api/v3/urls', options);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Fetch Data</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default MyComponent;
