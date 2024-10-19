import DB from '@/lib/db';

// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    console.log(request.url);
    console.log(pathname);

    console.log("sss")
    // Örnek: Belirli bir rotaya erişimi kontrol etme
    //if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token');
    if (!token) {
        if (pathname != '/auth')
            return NextResponse.redirect(new URL('/auth', request.url));
    }
    //}

    // Örnek: Dil bazlı yönlendirme
    /*if (pathname === '/') {
        const userLang = request.headers.get('accept-language')?.split(',')[0] || 'en'
        if (userLang.startsWith('tr')) {
            return NextResponse.redirect(new URL('/tr', request.url))
        }
    }*/

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/about',
        '/auth',
        '/blog',
        '/blog/:path*',
        '/papers',
        '/papers/:path*',
        '/projects',
        '/projects/:path*',
        '/settings',
        '/support',
        '/support/:path*',
        '/theme',
        '/users',
        '/users/:path*'
    ],
}
