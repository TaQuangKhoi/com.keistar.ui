import {default as axios} from "@/lib/axios-instance";

interface UserDescription {
    firstname: string,
    job_title: string,
    lastname: string,
    manager_id: string,
    title: string,
    userName: string,
}

async function updateUserById(
    id: string,
    userDescription: UserDescription,
) {
    return await axios.put(`/API/identity/user/${id}`, userDescription)
}

export {
    updateUserById,
}