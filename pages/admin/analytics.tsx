'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { books } from '../../src/data/books';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('../../components/AnalyticsMap'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

interface AnalyticsData {
  summary: {
    totalVisits: number;
    linkClicksByBook: Array<{
      book_id: string;
      link_type: string;
      count: number;
    }>;
  };
  geolocations: Array<{
    latitude: number;
    longitude: number;
    cityName: string;
    regionName: string;
    countryCode: string;
    countryName: string;
  }>;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
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

  const getBookTitle = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book ? book.title : bookId;
  };

  const getLinkTypeDisplay = (linkType: string) => {
    switch (linkType) {
      case 'amazon':
        return 'Amazon';
      case 'google_play':
        return 'Google Play';
      default:
        return linkType;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Analytics Dashboard</h1>
      
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

      {data && (
        <>
          {/* Summary Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '30px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>Summary</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.summary.totalVisits}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Visits</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>
                  {data.summary.linkClicksByBook.reduce((sum, item) => sum + item.count, 0)}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Link Clicks</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.geolocations.length}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Unique Locations</div>
              </div>
            </div>
          </div>

          {/* Link Clicks by Book */}
          <div style={{ marginBottom: '30px' }}>
            <h2>Link Clicks by Book</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {data.summary.linkClicksByBook.map((item, index) => (
                <div key={index} style={{ 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px', 
                  padding: '15px',
                  background: 'white',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#333' }}>
                    {getBookTitle(item.book_id)}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#666' }}>{getLinkTypeDisplay(item.link_type)}</span>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ marginBottom: '30px' }}>
            <h2>Visitor Locations</h2>
            <div style={{ height: '500px', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
              <MapComponent geolocations={data.geolocations} />
            </div>
          </div>
        </>
      )}
    </div>
  );
} 