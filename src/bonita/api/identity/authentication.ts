import {default as axios, getBaseUrl} from "@/lib/axios-instance";

async function logout() {
    return await axios.get(<string>getBaseUrl('/logoutservice', window.location.hostname), {})
}

export {logout}