'use client'
import {Button} from "@/components/ui/button";
import {useBonitaSession} from "@/lib/bonita_api_utils";

async function signIn() {
    let url = 'http://localhost:28071/bonita/loginservice'
    let username = 'haovan'
    let password = 'toikhoi'

    await fetch(url,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&password=${password}&redirect=false&redirectURL=`,
            method: 'POST',
            mode: 'cors',
            credentials: "include",
        }
    ).then(response => {
        console.log(response.status)
        console.log(response)
    }).catch(
        error => {
            console.log(error)
        }
    )
}

export default function TestPage() {
    const {session, isSessionLoading, isError} = useBonitaSession()

    async function test() {
        console.log('test')
        // await signIn();
        console.log(session)
    }


    return (
        <div>
            <h1>Test Page</h1>
            <Button onClick={test}>
                Test Button
            </Button>
            {
                isSessionLoading ? <p>Loading...</p> : <p>Session: {session.user_name}</p>
            }
        </div>
    )
}