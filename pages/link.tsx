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
      if (linkType === 'payhip') destination = book.payHipUrl || null;
      if (linkType === 'apple') destination = book.appleUrl || null;
    }

    if (destination) {
      const visitorId = getOrCreateVisitorId();
      const withGeo = localStorage.getItem('cookiesAccepted');

      // Start redirection immediately - no need to wait for tracking
      const redirectTimeout = setTimeout(() => {
        window.location.href = destination!;
      }, 50); // Small delay to ensure tracking has time to start

      // Track the click asynchronously using sendBeacon if available
      if (navigator.sendBeacon) {
        // SendBeacon is designed for analytics and works even if the page unloads
        const trackData = new Blob([JSON.stringify({
          visitorId,
          bookId,
          linkType,
          userAgent: navigator.userAgent,
          ip: '',
          withGeo
        })], {type: 'application/json'});

        navigator.sendBeacon('/track-link', trackData);
        // Clear timeout as we've already initiated the beacon
        clearTimeout(redirectTimeout);
        window.location.href = destination!;
      } else {
        // Fallback to fetch for browsers without sendBeacon
        // Using keepalive to ensure request completes even if page unloads
        fetch('/track-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            bookId,
            linkType,
            userAgent: navigator.userAgent,
            ip: '',
            withGeo
          }),
          keepalive: true // This allows the request to complete even if page navigates away
        });

        // Don't wait for the response, redirect immediately
        clearTimeout(redirectTimeout);
        window.location.href = destination!;
      }
    } else {
      // Invalid book or link type, redirect to home
      router.replace('/');
    }
  }, [router]);

  return <Spinner />;
} 