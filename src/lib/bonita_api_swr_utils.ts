import useSWR from 'swr'
import {sessionApiUrl} from "@/lib/api-enpoints";

const init: RequestInit = {
    credentials: "include",
    mode: 'cors',
}

const fetcher = (url: string) => fetch(url, init
).then(res => res.json())


function useBonitaSession() {
    const {data, error, isLoading} = useSWR(sessionApiUrl, (url) => fetcher(url))

    return {
        session: data,
        isSessionLoading: isLoading,
        isError: error
    }
}

async function findUserById(id: string) {
    let url = 'http://localhost:28071/bonita/API/identity/user/' + id
    let result = null
    let status = null

    await fetch(url,
        {
            credentials: "include",
            mode: 'cors',
        }
    ).then(response => {
        status = response.status
        return response.json();
    }).then(
        data => {
            result = data
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
    return [result, status];
}

async function isLogin() {
    return await fetch(
        sessionApiUrl, init
    ).then(response => response.json()
    ).then((data) => {
        return !!data.id;
    }).catch((error) => {
        console.log(error)
    })
}

export {
    useBonitaSession,
    findUserById,
    isLogin,
}
