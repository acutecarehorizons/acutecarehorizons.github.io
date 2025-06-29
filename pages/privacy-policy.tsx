import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleForgetMe = async () => {
    if (typeof window === 'undefined') return;
    
    const visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      setDeleteMessage('No visitor data found to delete.');
      return;
    }

    setIsDeleting(true);
    setDeleteMessage('');

    try {
      const response = await fetch('/forget-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId }),
      });

      const result = await response.json();

      if (result.success) {
        // Clear the visitor ID from localStorage
        localStorage.removeItem('visitorId');
        localStorage.removeItem('cookiesAccepted');
        setDeleteMessage('Your data has been successfully deleted. You will no longer be tracked on this site.');
      } else {
        setDeleteMessage('Error deleting data: ' + result.error);
      }
    } catch (error) {
      setDeleteMessage('Error deleting data. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Privacy Policy - Acute Care Horizons</title>
        <meta name="description" content="Privacy Policy for Acute Care Horizons" />
      </Head>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', lineHeight: '1.6' }}>
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <h2>Information We Collect</h2>
        <p>We collect the following information when you visit our website:</p>
        <ul>
          <li><strong>Anonymous Visitor ID:</strong> A randomly generated identifier stored in your browser</li>
          <li><strong>Approximate Location:</strong> City and country level location (derived from IP address, but we do not store your actual IP address)</li>
          <li><strong>Usage Data:</strong> Which pages you visit and links you click</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use this information solely for:</p>
        <ul>
          <li>Understanding how visitors use our website</li>
          <li>Improving our content and services</li>
          <li>Analyzing website performance</li>
        </ul>

        <h2>Data Storage and Retention</h2>
        <p>We store your data for up to 2 years. After this period, data is automatically deleted.</p>

        <h2>Data Security</h2>
        <p>We implement appropriate security measures to protect your information. We do not store your IP address or any personally identifiable information.</p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Withdraw consent for data collection by clearing your browser data</li>
          <li>Contact us with privacy concerns or questions</li>
          <li>Request information about our data practices</li>
        </ul>
        
        <h2>Data Deletion</h2>
        <p>Since we use pseudonymous identifiers (visitor IDs) rather than personally identifiable information, we cannot directly delete data for specific individuals. However, you can:</p>
        <ul>
          <li>Clear your browser's localStorage to remove your visitor ID</li>
          <li>Use browser privacy modes to prevent tracking</li>
          <li>Contact us if you have questions about our data practices</li>
        </ul>
        <p>All data is automatically deleted after 2 years as part of our retention policy.</p>

        <h2>Delete Your Data</h2>
        <p>If you want to delete all data associated with your current visitor ID, you can use the button below:</p>
        <div style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <button
            onClick={handleForgetMe}
            disabled={isDeleting}
            style={{
              background: isDeleting ? '#ccc' : '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '0.75rem 1.5rem',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete My Data'}
          </button>
          {deleteMessage && (
            <p style={{ 
              marginTop: '0.5rem', 
              color: deleteMessage.includes('Error') ? '#dc3545' : '#28a745',
              fontWeight: 'bold'
            }}>
              {deleteMessage}
            </p>
          )}
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#666' }}>
            This will delete all data associated with your current visitor ID and stop tracking for this browser.
          </p>
        </div>

        <h2>Contact Us</h2>
        <p>If you have questions about this privacy policy or want to exercise your rights, please <a href="/contact" style={{color: '#0070f3', textDecoration: 'underline'}}>contact us</a>.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
      </div>
      <Footer />
    </>
  );
} 