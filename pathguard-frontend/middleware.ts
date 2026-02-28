import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // We check for a mock 'auth-token' cookie. 
  // In a real app, NextAuth or a secure HttpOnly cookie would be verified here.
  const authToken = request.cookies.get('auth-token')?.value;
  const isProtectedPath = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedPath && !authToken) {
    // Redirect unauthenticated users to the login page securely
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only run middleware on the dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
