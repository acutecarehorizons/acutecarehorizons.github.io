import React, { useState, useEffect } from 'react';

async function updateGeo() {
  const visitorId = localStorage.getItem('visitorId');
  if (!visitorId) return;
  await fetch('/update-geo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId,
    }),
  });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVisible(localStorage.getItem('cookiesAccepted') !== 'true' && localStorage.getItem('cookiesAccepted') !== 'false');
    }
  }, []);

  const handleAccept = async () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
    // Enable analytics here
    await updateGeo();
  };

  const handleDeny = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setVisible(false);
    // Do NOT enable analytics
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100vw',
      background: '#222',
      color: '#fff',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      borderTop: '3px solid #0070f3',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
      minHeight: '120px',
    }}>
      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        marginBottom: '1.5rem',
      }}>
        <h3 style={{
          margin: '0 0 1rem 0',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}>
          🍪 Cookie Notice
        </h3>
        <p style={{
          margin: 0,
          fontSize: '1.1rem',
          lineHeight: '1.6',
        }}>
          We use cookies and similar technologies to analyze site usage and improve our services. 
          This includes collecting your approximate location (city/country level). 
          We do not store your IP address or any personally identifiable information.
          Data is stored for up to 2 years and used solely for website analytics. 
          You can withdraw consent at any time by clearing your browser data.
        </p>
        <p style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.9rem',
          opacity: 0.8,
        }}>
          For more information, see our <a href="/privacy-policy" style={{color: '#0070f3', textDecoration: 'underline'}}>Privacy Policy</a>.
        </p>
      </div>
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <button
          onClick={handleAccept}
          style={{
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.75rem 2rem',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0, 112, 243, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#0051cc';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#0070f3';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Accept
        </button>
        <button
          onClick={handleDeny}
          style={{
            background: '#444',
            color: '#fff',
            border: '2px solid #666',
            borderRadius: 8,
            padding: '0.75rem 2rem',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#555';
            e.currentTarget.style.borderColor = '#777';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#444';
            e.currentTarget.style.borderColor = '#666';
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
} 