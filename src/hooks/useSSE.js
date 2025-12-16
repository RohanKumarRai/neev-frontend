import { useEffect, useRef } from 'react';

// token: JWT string
// onEvent: fn(event) => void
// userId: string or number for the stream path
export default function useSSE(token, onEvent, userId) {
  const esRef = useRef(null);

  useEffect(() => {
    if (!token || !userId) return;

    // NOTE: many servers block tokens in querystrings in production.
    // For dev, the backend should accept ?token=... for SSE.
    const url = `http://localhost:8080/api/notifications/stream/${userId}?token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);

    es.onmessage = (e) => {
      if (onEvent) onEvent(e);
    };
    es.onerror = (err) => {
      console.warn('SSE error', err);
      es.close();
    };

    esRef.current = es;
    return () => { if (esRef.current) esRef.current.close(); };
  }, [token, onEvent, userId]);
}
