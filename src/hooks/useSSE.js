// src/hooks/useSSE.js
//
// ✅ CHANGES:
//  1. URL fixed. The backend endpoint is GET /api/notifications/stream (no userId in path).
//     The old URL was /api/notifications/stream/{userId}?token=... which doesn't match
//     the backend route at all — it would return 404 every time.
//
//  2. Token-in-querystring approach kept BUT explained clearly:
//     EventSource does not support custom headers, so passing the token as a query
//     param is the standard workaround for SSE. The backend's JwtAuthFilter reads
//     the Authorization header, so we need a small backend fix to also check
//     the ?token= param for SSE connections only (see note below).
//
//  3. Auto-reconnect: EventSource reconnects automatically on error by default.
//     We no longer close on error — just log it and let the browser retry.
//
//  BACKEND NOTE: Add this to JwtAuthFilter.doFilterInternal() BEFORE the
//  Authorization header check, so SSE connections work:
//
//    // Allow token via query param for SSE (EventSource can't set headers)
//    String tokenParam = request.getParameter("token");
//    if (tokenParam != null && authHeader == null) {
//        authHeader = "Bearer " + tokenParam;
//    }

import { useEffect, useRef } from "react";

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api";

export default function useSSE(token, onEvent) {
  const esRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const url = `${BASE_URL}/notifications/stream?token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);

    es.addEventListener("notification", (e) => {
      if (onEvent) {
        try {
          onEvent(JSON.parse(e.data));
        } catch {
          onEvent(e.data);
        }
      }
    });

    es.onerror = (err) => {
      console.warn("SSE connection error — browser will retry automatically", err);
    };

    esRef.current = es;

    return () => {
      esRef.current?.close();
    };
  }, [token]); // only reconnect if token changes
}
