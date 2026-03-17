import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('nxg_auth')?.value;
  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/onboarding')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
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
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
