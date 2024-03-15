/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/User/operation/getUserById
 */

import {default as axios, getBaseUrl} from "@/lib/axios-instance";
import {User} from "@/bonita/api/bpm/archived-process-instance/types";

async function getUserById(userId: string): Promise<User> {
    return await axios.get(getBaseUrl(`/API/identity/user/`, window.location.hostname) + userId, {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}

export {getUserById}