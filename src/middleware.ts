import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken");

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/admin")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

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
  ],
};
