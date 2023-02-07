// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { env } from 'process';

export async function middleware(req: any, res: any) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
        if(req.cookies.get('token') != 'admin') {
            return NextResponse.rewrite(new URL('/admin/login', req.url))
        }
    }
}