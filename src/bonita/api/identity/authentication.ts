import {default as axios} from "@/lib/axios-instance";

async function logout() {
    return await axios.get('/logoutservice', {})
}

export {logout}