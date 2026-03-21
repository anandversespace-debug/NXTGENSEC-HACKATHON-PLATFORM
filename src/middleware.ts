import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('nxg_auth')?.value;
  const { pathname } = request.nextUrl;

  const decodeJWT = (token: string) => {
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
      const decoded = JSON.parse(atob(padded));
      return decoded;
    } catch (e) {
      console.error('Middleware JWT Decode Error:', e);
      return null;
    }
  }

  const user = token ? decodeJWT(token) : null;
  const isAdmin = user?.role === 'admin' || user?.role === 'organizer';

  // 1. Handle Admin Routes & Consolidate Login
  if (pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/admin') {
    if (isAdmin) {
       return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else {
       return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname.startsWith('/admin')) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Handle User Routes (Dashboard, Onboarding)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Handle Auth Pages (Login, Signup) for already authenticated users
  if (pathname === '/login' || pathname === '/signup') {
    if (token) {
      // Role-based auto-redirection if already logged in
      if (isAdmin) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
