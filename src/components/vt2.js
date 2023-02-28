const VirusTotalScanner2 = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url })
    };

    fetch('/api/virustotal', requestOptions)
      .then(response => response.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setResult(null);
        setLoading(false);
      });
  }

  return (
    <div>
      <h1>VirusTotal Scanner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL:
          <input type="text" value={url} onChange={event => setUrl(event.target.value)} />
        </label>
        <button type="submit" disabled={loading}>Scan</button>
        <p>The scan will take a few seconds</p>
      </form>
      {loading && <p>Scanning...</p>}
      {result && (
        <div>
          <p>Scan results:</p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default VirusTotalScanner2;
