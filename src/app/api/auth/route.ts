import {NextResponse} from "next/server";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(request: Request) {
    const body = await request.json()
    const username = body.username
    const password = body.password

    const res = await fetch('http://localhost:28071/bonita/loginservice', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: `username=${username}&password=${password}&redirect=false&redirectURL=`
    })

    const resCode = res.status
    if (resCode !== 200
        && resCode !== 204) {
        return new NextResponse('', {
            status: resCode,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    let cookies = res.headers.get('set-cookie')
    return new NextResponse('', {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': cookies ? cookies.replace(/\/bonita/g, '/') : ''
        }
    })
}

