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

interface CleanupResult {
  success: boolean;
  message: string;
  details?: {
    timeOffset: string;
    visitsDeleted: number;
    clicksDeleted: number;
    visitorsDeleted: number;
  };
  error?: string;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  
  // Cleanup state
  const [cleanupYears, setCleanupYears] = useState(2);
  const [cleanupMonths, setCleanupMonths] = useState(0);
  const [cleanupDays, setCleanupDays] = useState(0);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupResult, setCleanupResult] = useState<CleanupResult | null>(null);

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

  const handleCleanup = async () => {
    setCleanupLoading(true);
    setCleanupResult(null);
    
    try {
      const response = await fetch('/cleanup-old-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          years: cleanupYears || undefined,
          months: cleanupMonths || undefined,
          days: cleanupDays || undefined,
        }),
      });
      
      const result: CleanupResult = await response.json();
      setCleanupResult(result);
      
      if (result.success) {
        // Refresh analytics after cleanup
        fetchAnalytics();
      }
    } catch (error) {
      setCleanupResult({
        success: false,
        message: 'Error performing cleanup',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setCleanupLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBookTitle = (bookId: string) => {
    if (bookId.startsWith('generic_')) {
      const linkType = bookId.replace('generic_', '');
      switch (linkType) {
        case 'amazon':
          return 'Generic Amazon Search';
        case 'google_play':
          return 'Generic Google Play Search';
        case 'apple':
          return 'Generic Apple Search';
        default:
          return `Generic ${linkType}`;
      }
    }
    const book = books.find(b => b.id === bookId);
    return book ? book.title : bookId;
  };

  const getLinkTypeDisplay = (linkType: string) => {
    switch (linkType) {
      case 'amazon':
        return 'Amazon';
      case 'google_play':
        return 'Google Play';
      case 'apple':
        return 'Apple Books';
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

      {/* Data Cleanup Section */}
      <div style={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: '8px', 
        padding: '20px', 
        marginBottom: '30px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Data Cleanup</h2>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>
          Delete data older than the specified time period. This action cannot be undone.
        </p>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ marginRight: '5px' }}>Years:</label>
            <input
              type="number"
              min={0}
              value={cleanupYears}
              onChange={e => setCleanupYears(Number(e.target.value))}
              style={{ width: 60 }}
            />
          </div>
          <div>
            <label style={{ marginRight: '5px' }}>Months:</label>
            <input
              type="number"
              min={0}
              max={11}
              value={cleanupMonths}
              onChange={e => setCleanupMonths(Number(e.target.value))}
              style={{ width: 60 }}
            />
          </div>
          <div>
            <label style={{ marginRight: '5px' }}>Days:</label>
            <input
              type="number"
              min={0}
              max={30}
              value={cleanupDays}
              onChange={e => setCleanupDays(Number(e.target.value))}
              style={{ width: 60 }}
            />
          </div>
          <button
            onClick={handleCleanup}
            disabled={cleanupLoading}
            style={{
              background: cleanupLoading ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              cursor: cleanupLoading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {cleanupLoading ? 'Cleaning...' : 'Clean Old Data'}
          </button>
        </div>
        
        {cleanupResult && (
          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            borderRadius: '4px',
            backgroundColor: cleanupResult.success ? '#d4edda' : '#f8d7da',
            color: cleanupResult.success ? '#155724' : '#721c24',
            border: `1px solid ${cleanupResult.success ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            <strong>{cleanupResult.message}</strong>
            {cleanupResult.details && (
              <div style={{ marginTop: '5px', fontSize: '14px' }}>
                Time offset: {cleanupResult.details.timeOffset}<br/>
                Visits deleted: {cleanupResult.details.visitsDeleted}<br/>
                Clicks deleted: {cleanupResult.details.clicksDeleted}<br/>
                Visitors deleted: {cleanupResult.details.visitorsDeleted}
              </div>
            )}
            {cleanupResult.error && (
              <div style={{ marginTop: '5px', fontSize: '14px' }}>
                Error: {cleanupResult.error}
              </div>
            )}
          </div>
        )}
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