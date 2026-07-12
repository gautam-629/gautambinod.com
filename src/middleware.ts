import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  // Always let the login page through — no auth check needed.
  if (isLoginPage) {
    return NextResponse.next();
  }

  // Wrap auth() in try/catch so a JWTSessionError (caused by a missing or
  // rotated NEXTAUTH_SECRET, or a malformed cookie from a previous session)
  // is treated the same as "no session" and redirects to login cleanly,
  // rather than throwing an unhandled error that Next.js surfaces as a 500.
  let session = null;
  try {
    session = await auth();
  } catch {
    // Auth failure — treat as unauthenticated and redirect to login.
  }

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
