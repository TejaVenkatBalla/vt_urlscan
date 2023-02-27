import React, { useState, useEffect } from 'react';

const API_KEY = 'ee9a95de89da158a7983bfe95d3f54d5027a0f951d4b16ab0438bb04e25285f6';

const VirusTotalScanner = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisId, setAnalysisId] = useState(null);
//   const [scansDone, setScansDone] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const options = {
      method: 'POST',
      headers: {
        'x-apikey': API_KEY,
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        url: url
      })
    };

    fetch(`https://www.virustotal.com/api/v3/urls?url=${url}`, options)
      .then(response => response.json())
      .then(data => {
        setAnalysisId(data.data.id);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setResult(null);
        setLoading(false);
      });
  }

  useEffect(() => {
    const checkScanStatus = () => {
      if (!analysisId) {
        return;
      }

      const options = {
        method: 'GET',
        headers: {
          'x-apikey': API_KEY,
          accept: 'application/json'
        }
      };

      fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, options)
        .then(response => response.json())
        .then(data => {
          if (data.data.attributes.status === 'completed') {
            setResult(data);
            setAnalysisId(null);
          }
          setScansDone(data.data.attributes.results.total);
        })
        .catch(error => {
          console.error(error);
        });
    }

    const intervalId = setInterval(checkScanStatus, 5000);

    return () => clearInterval(intervalId);
  }, [analysisId]);

  return (
    <div>
      <h1>VirusTotal Scanner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL:
          <input type="text" value={url} onChange={event => setUrl(event.target.value)} />
        </label>
        <button type="submit" disabled={loading}>Scan</button>
        <p>The scan will take few seconds</p>
      </form>
      {loading && <p>Scanning...</p>}
      {result && (
        <div>
          <p>Scan results:</p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {result.data.attributes.malicious ?
            <p>The URL is malicious</p>
            :
            <div>
              <p>The URL is safe</p>
              
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default VirusTotalScanner;
