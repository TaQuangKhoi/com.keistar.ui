import axios from 'axios'


async function getCurrentUserSession() {
    return await axios.get(process.env.NEXT_PUBLIC_BONITA_URL + '/API/system/session/unusedId', {
        withCredentials: true,
    })
}

export {getCurrentUserSession}