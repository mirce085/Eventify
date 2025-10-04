import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware({
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localePrefix: 'as-needed',
});

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the token to check authentication status
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard'];

    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route) || pathname.includes(route)
    );

    // If accessing protected route without authentication
    if (isProtectedRoute && !token) {
        // Extract locale from pathname or use default
        const locale = pathname.startsWith('/ru') ? 'ru' : '';
        const signInUrl = new URL(`/${locale}/auth/signin`, request.url);
        return NextResponse.redirect(signInUrl);
    }

    // If authenticated user tries to access auth pages, redirect to dashboard
    if (token && (pathname.includes('/auth/signin') || pathname.includes('/auth/signup'))) {
        const locale = pathname.startsWith('/ru') ? 'ru' : '';
        const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // Apply internationalization middleware
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};