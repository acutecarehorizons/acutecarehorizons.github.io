import React, { useState, useEffect } from 'react';

async function updateGeo() {
  const visitorId = localStorage.getItem('visitorId');
  if (!visitorId) return;
  await fetch('/update-geo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId,
      ip: '', // Optionally leave blank; backend can use request headers
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
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
    }}>
      <span style={{ marginRight: 16 }}>
        We use cookies for analytics to help us improve our offerings. By clicking "Accept", you consent to analytics cookies.
      </span>
      <button
        onClick={handleAccept}
        style={{
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          marginRight: 8,
        }}
      >
        Accept
      </button>
      <button
        onClick={handleDeny}
        style={{
          background: '#444',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
      >
        Deny
      </button>
    </div>
  );
} 