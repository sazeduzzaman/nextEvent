import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams, search } = request.nextUrl;
  const token = request.cookies.get("authToken");

  // Define protected routes
  const protectedPaths = ["/dashboard", "/user", "/admin", "/events/details/"];

  // Check if current path is protected
  const isProtectedRoute = protectedPaths.some((p) => {
    if (p === "/events/details/") {
      // Protect exactly /events/details/[slug]/ticket
      return (
        pathname.startsWith(p) &&
        /^\/events\/details\/[^\/]+\/ticket$/.test(pathname)
      );
    }
    return pathname.startsWith(p);
  });

  if (isProtectedRoute && !token) {
    // ✅ Allow Stripe return (always comes with ?session_id=)
    if (searchParams.has("session_id")) {
      return NextResponse.next();
    }

    // Redirect to login with redirect param
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in user from going back to login page
  if (pathname === "/auth/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

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
