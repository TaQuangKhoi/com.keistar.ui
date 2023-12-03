import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const cookieStore = cookies()
    const cookie = cookieStore.get('X-Bonita-API-Token')
    console.log(cookie)
    const res = await fetch('http://localhost:8080/bonita/API/system/session/1', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
    })
    const data = await res.json()

    return Response.json({ data })
}