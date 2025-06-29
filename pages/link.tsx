import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { books } from '../src/data/books';

const spinnerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  zIndex: 9999,
};
function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
}
const Spinner = () => (
  <div style={spinnerStyle}>
    <div style={{
      width: 48,
      height: 48,
      border: '6px solid #eee',
      borderTop: '6px solid #0070f3',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default function LinkRedirect() {
  const router = useRouter();

  
  useEffect(() => {
    if (!router.isReady) return;

    const { bookId, linkType } = router.query;
    if (typeof bookId !== 'string' || typeof linkType !== 'string') {
      router.replace('/');
      return;
    }
    const book = books.find(b => b.id === bookId);

    let destination: string | null = null;
    if (book) {
      if (linkType === 'amazon') destination = book.amazonUrl;
      if (linkType === 'google') destination = book.googlePlayUrl || null;
    }

    if (destination) {
      const visitorId = getOrCreateVisitorId();
      const withGeo = localStorage.getItem('cookiesAccepted');
      // Track the click
      fetch('/track-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          bookId,
          linkType,
          userAgent: navigator.userAgent,
          ip: '', // Let backend use headers
          withGeo
        }),
      }).finally(() => {
        // Redirect after tracking
        window.location.href = destination!;
      });
    } else {
      // Invalid book or link type, redirect to home
      router.replace('/');
    }
  }, [router]);

  return <Spinner />;
} 