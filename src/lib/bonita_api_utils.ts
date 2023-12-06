import useSWR from 'swr'

const fetcher = (url: string) => fetch(url, {
        credentials: "include",
        mode: 'cors',
    }
).then(res => res.json())

export function useBonitaSession() {
    let url = 'http://localhost:28071/bonita/API/system/session/unusedId'
    const {data, error, isLoading} = useSWR(url, (url) => fetcher(url))

    return {
        session: data,
        isSessionLoading: isLoading,
        isError: error
    }
}

export async function findUserById(id: string) {
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