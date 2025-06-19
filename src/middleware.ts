import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/cart') {
    return NextResponse.redirect(new URL('/checkout', request.url));
  }
}