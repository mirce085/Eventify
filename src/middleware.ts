import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware({
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    localePrefix: 'as-needed',
});

function buildUrl(request: NextRequest, pathname: string) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return url;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route) || pathname.includes(route)
    );

    const isRu = pathname.startsWith('/ru');
    const withLocale = (p: string) => (isRu ? `/ru${p}` : p);

    if (isProtectedRoute && !token) {
        const signInUrl = buildUrl(request, withLocale('/auth/signin'));
        return NextResponse.redirect(signInUrl);
    }

    if (token && (pathname.includes('/auth/signin') || pathname.includes('/auth/signup'))) {
        const dashboardUrl = buildUrl(request, withLocale('/dashboard'));
        return NextResponse.redirect(dashboardUrl);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
