import axios from 'axios';
import {default as axios2, getBaseUrl} from "@/lib/axios-instance";

async function login(username: string, password: string) {
    return await axios.post(<string>getBaseUrl('/loginservice', process.env.NEXT_PUBLIC_BONITA_HOSTNAME),
        `username=${username}&password=${password}&redirect=false&redirectURL=`,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    ).then((res) => {
        return res;
    }).catch((error) => {
        console.error(error);
        return error;
    });
}

export {login}