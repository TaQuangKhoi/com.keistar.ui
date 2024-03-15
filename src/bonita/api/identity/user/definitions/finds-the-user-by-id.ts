/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/User/operation/getUserById
 */

import {default as axios} from "@/lib/axios-instance";
import {User} from "@/bonita/api/bpm/archived-process-instance/types";

async function getUserById(userId: string): Promise<User> {
    return await axios.get(`/API/identity/user/${userId}`, {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}

export {getUserById}