import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(request: Request) {
    const res = await fetch('http://localhost:28071/bonita/loginservice', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: 'username=haovan&password=toikhoi&redirect=false&redirectURL='
    })

    let cookies = res.headers.get('set-cookie')

    // set cookie
    return new NextResponse('', {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookies ? cookies.replace(/\/bonita/g, '/') : ''
        }
    })
}

