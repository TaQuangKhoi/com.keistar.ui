import axios from "axios";
import {Metadata} from "next";
import TestComponent from "@/app/test/test-component";

export const metadata: Metadata = {
    title: "Test Page",
    description: "This page is for testing purpose only",
}

export default function TestPage() {
    // const {session, isSessionLoading, sessionError} = useBonitaSession()

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
            <TestComponent/>
        </div>
    )
}