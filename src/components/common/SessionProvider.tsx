"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

/**
 * Thin wrapper around NextAuth's SessionProvider.
 * We do NOT pass an initial server-side session here because the root layout
 * no longer calls auth() (that would crash on JWTSessionError if
 * NEXTAUTH_SECRET is missing/mismatched). Client components that call
 * useSession() will lazy-fetch the session via /api/auth/session instead —
 * this is the standard NextAuth pattern and works correctly.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider refetchOnWindowFocus={false}>
      {children}
    </NextAuthSessionProvider>
  );
}
