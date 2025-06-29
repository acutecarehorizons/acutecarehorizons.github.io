import type { NextApiRequest, NextApiResponse } from 'next';
import { books } from '../../src/data/books';

// Helper to get the destination URL
function getBookLink(book: any, linkType: string): string | null {
  if (linkType === 'amazon') return book.amazonUrl;
  if (linkType === 'google' && book.googlePlayUrl) return book.googlePlayUrl;
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { bookId, linkType, visitorId } = req.query;

  if (typeof bookId !== 'string' || typeof linkType !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid bookId or linkType' });
  }

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(400).json({ error: 'Book not found' });
  }

  const destination = getBookLink(book, linkType);
  if (!destination) {
    return res.status(400).json({ error: 'Invalid link type for this book' });
  }

  // Prepare payload for Cloudflare Worker
  const payload = {
    visitorId: typeof visitorId === 'string' ? visitorId : undefined,
    bookId,
    linkType,
    userAgent: req.headers['user-agent'] || '',
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
    withGeo: false // Set to true if cookies/analytics are accepted (frontend should control this)
  };

  // Call Cloudflare Worker to log the click (replace with your Worker endpoint)
  try {
    await fetch('/track-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // Log error but continue with redirect
    console.error('Failed to log click:', e);
  }

  // Redirect to the destination URL
  res.redirect(destination);
} 