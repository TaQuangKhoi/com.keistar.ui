import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname)
    const allCookies = request.cookies

    console.log(allCookies)

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/authentication",
        "/api/:path*",
    ]
}