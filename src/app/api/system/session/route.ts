import {cookies} from 'next/headers'

export async function GET(request: Request) {
    const cookieStore = cookies()
    const bonitaApiKey = cookieStore.get('X-Bonita-API-Token')
    const jSessionId = cookieStore.get('JSESSIONID')

    const error401Response = new Response(JSON.stringify({error: "No Bonita API Key and JSESSIONID cookie found"}), {
        status: 401,
        statusText: 'Unauthorized',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!bonitaApiKey && !jSessionId) {
        return error401Response
    }
    if (!bonitaApiKey) {
        return error401Response
    }
    if (!jSessionId) {
        return error401Response
    }

    const res = await fetch(process.env.NEXT_PUBLIC_BONITA_URL + "/API/system/session/unusedId", {
        method: 'GET',
    })

    if (res.status === 200) {
        const data = await res.json()
        return Response.json({data})
    } else {
        console.log("res", res)
        return new Response(
            JSON.stringify({
                error: "Failed to fetch session",
            }
        ), {
            status: res.status,
            statusText: res.statusText,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}