'use client'
import {Button} from "@/components/ui/button";

async function getSession() {
    let url = 'http://localhost:28071/bonita/API/system/session/unusedId'

    await fetch(url,
        {
            credentials: "include",
            mode: 'cors',
        }
    ).then(response => {
        return response.json();
    }).then(
        data => {
            console.log(data)
        }
    ).catch(
        error => {
            console.log(error)
        }
    )
}

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

    async function test() {
        console.log('test')
        // await signIn();
        await getSession();
    }

    return (
        <div>
            <h1>Test Page</h1>
            <Button onClick={test}>
                Test Button
            </Button>
        </div>
    )
}