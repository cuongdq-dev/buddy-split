import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // ✅ Cho phép các đường dẫn tĩnh, API, service worker, favicon, v.v.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/static/") ||
    pathname === "/favicon.ico" ||
    pathname === "/firebase-messaging-sw.js" // <-- Quan trọng nhất
  ) {
    return NextResponse.next();
  }

  // Nếu đã login mà truy cập /login → redirect về /
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Nếu chưa login mà truy cập trang khác → redirect về /login
  if (pathname !== "/login" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// ✅ Giới hạn phạm vi middleware
export const config = {
  matcher: [
    "/((?!_next/|api/|static/|favicon.ico|firebase-messaging-sw.js).*)",
  ],
};
