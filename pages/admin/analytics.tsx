'use client';
import React, { useEffect, useState } from 'react';

export default function Analytics() {
  const [data, setData] = useState<{ visits: any[]; link_clicks: any[] } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchAnalytics = () => {
    setLoading(true);
    setError('');
    fetch(`/get-analytics?days=${days}`)
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
      <h2>Visits</h2>
      <table>
        <thead>
          <tr>
            <th>Geo</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data && data.visits.map(row => (
            <tr key={row.id}>
              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.user_agent}</td>
              <td>
                {row.geolocation_json ? (() => {
                  try {
                    const geo = JSON.parse(row.geolocation_json);
                    return `${geo.cityName || ''}, ${geo.regionName || ''}, ${geo.countryCode || ''} (${geo.latitude}, ${geo.longitude})`;
                  } catch {
                    return 'Invalid';
                  }
                })() : 'N/A'}
              </td>
              <td>{row.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ marginTop: 32 }}>Link Clicks</h2>
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Link Type</th>
            <th>Geo</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data && data.link_clicks.map(row => (
            <tr key={row.id}>
              <td>{row.book_id}</td>
              <td>{row.link_type}</td>
              <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.user_agent}</td>
              <td>
                {row.geolocation_json ? (() => {
                  try {
                    const geo = JSON.parse(row.geolocation_json);
                    return `${geo.cityName || ''}, ${geo.regionName || ''}, ${geo.countryCode || ''} (${geo.latitude}, ${geo.longitude})`;
                  } catch {
                    return 'Invalid';
                  }
                })() : 'N/A'}
              </td>
              <td>{row.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 