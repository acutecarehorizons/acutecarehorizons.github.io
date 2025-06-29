import React, { useEffect, useState } from 'react';

function getCachedPassword() {
  return sessionStorage.getItem('analyticsPassword') || '';
}

function setCachedPassword(pw: string) {
  sessionStorage.setItem('analyticsPassword', pw);
}

export default function Analytics() {
  const [data, setData] = useState<{ url: string; clicks: number }[] | null>(null);
  const [password, setPassword] = useState(getCachedPassword());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!password) return;
    setLoading(true);
    setError('');
    fetch('/get-analytics', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('admin:' + password)
      }
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error('Incorrect password');
        }
        return res.json();
      })
      .then(result => {
        setData(result);
        setCachedPassword(password);
        setLoading(false);
      })
      .catch(err => {
        setError('Incorrect password');
        setData(null);
        setCachedPassword('');
        setLoading(false);
      });
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData(null);
    setError('');
    setLoading(true);
    // The useEffect will trigger fetch
    setPassword(password);
  };

  if (!data && !loading) {
    return (
      <div>
        <h1>Analytics Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ marginRight: 8 }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'View Analytics'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Analytics</h1>
      <table>
        <thead>
          <tr>
            <th>Book/Link</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(row => (
            <tr key={row.url}>
              <td>{row.url}</td>
              <td>{row.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 