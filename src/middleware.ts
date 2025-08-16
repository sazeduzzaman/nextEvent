import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams, search } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  // Define protected routes
  const protectedPaths = ["/dashboard", "/user", "/admin", "/events/details/"];

  // Check if current path is a protected route
  const isProtectedRoute = protectedPaths.some((p) => {
    if (p === "/events/details/") {
      // Protect exactly /events/details/[slug]/ticket
      return pathname.startsWith(p) && /^\/events\/details\/[^\/]+\/ticket$/.test(pathname);
    }
    return pathname.startsWith(p);
  });

  // 1️⃣ Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !token) {
    // Allow Stripe session return without login
    if (searchParams.has("session_id")) {
      return NextResponse.next();
    }

    // Redirect to login with original path + query
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // 2️⃣ Redirect logged-in users from /auth/login to the intended page
  if (pathname === "/auth/login" && token) {
    const redirectParam = searchParams.get("redirect") || "/dashboard";
    return NextResponse.redirect(new URL(redirectParam, request.url));
  }

  // 3️⃣ Allow all other requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/user/:path*",
    "/admin/:path*",
    "/auth/login",
    "/events/details/:slug/ticket",
  ],
};
