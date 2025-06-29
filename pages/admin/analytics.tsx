'use client';
import React, { useEffect, useState } from 'react';

export default function Analytics() {
  const [data, setData] = useState<{ book_id: string; link_type: string; clicks: number }[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchAnalytics = () => {
    setLoading(true);
    setError('');
    fetch(`https://acutecarehorizons.com/get-analytics?days=${days}`, {
      headers: {
        'Authorization': `Basic ${btoa('admin:erdoctor1')}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setError('Unauthorized');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>Analytics</h1>
      <div style={{ marginBottom: 16 }}>
        <label>
          Show data for last
          <input
            type="number"
            min={1}
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            style={{ width: 60, margin: '0 8px' }}
          />
          days
        </label>
        <button onClick={fetchAnalytics} style={{ marginLeft: 12 }}>Refresh</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Link Type</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(row => (
            <tr key={row.book_id + '-' + row.link_type}>
              <td>{row.book_id}</td>
              <td>{row.link_type}</td>
              <td>{row.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 