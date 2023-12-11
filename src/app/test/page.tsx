'use client'
import {Button} from "@/components/ui/button";
import {useBonitaSession} from "@/lib/bonita_api_swr_utils";
import {updateUserById} from "@/bonita/api/identity/user";
import {getCurrentUserSession} from "@/bonita/api/system/session";
import axios from "axios";

async function signIn() {
    let url = process.env.NEXT_PUBLIC_BONITA_URL + '/loginservice'
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
    const {session, isSessionLoading, sessionError} = useBonitaSession()

    async function test() {
        console.log('test')

        const userDescription = {
            firstname: "Zephania",
            job_title: "",
            lastname: "Farley",
            manager_id: "",
            title: "Ông",
            userName: "vehujerem"
        }

        // await updateUserById("152", userDescription);

        const res = await axios.post(process.env.NEXT_PUBLIC_BONITA_URL + '/loginservice',
            `username=haovan&password=toikhoi&redirect=false&redirectURL=`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        console.debug("res.headers: ", res.headers['Set-Cookie']);

        // fetch (process.env.NEXT_PUBLIC_BONITA_URL + '/loginservice?username=haovan&password=toikhoi&redirect=false&redirectURL=', {
        //     method: 'GET',
        //     mode: 'cors',
        //     credentials: "include",
        // }).then(response => {
        //     for (let pair of response.headers.entries()) {
        //         console.log(pair);
        //     }
        // }).then(
        // ).catch(
        //     error => {
        //         console.log(error)
        //     }
        // )
        // console.log(session)
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