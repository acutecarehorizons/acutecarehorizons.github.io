'use client';
import React, { useEffect, useState } from 'react';

export default function Analytics() {
  const [data, setData] = useState<{ url: string; clicks: number }[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/get-analytics')
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