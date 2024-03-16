/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/User/operation/getUserById
 */

import {default as axios, getBaseUrl, useBaseUrl} from "@/lib/axios-instance";
import {User} from "@/bonita/api/bpm/archived-process-instance/types";
import {useEffect, useState} from "react";

async function getUserById(userId: string): Promise<User> {
    return await axios.get(getBaseUrl(`/API/identity/user/`, window.location.hostname) + userId, {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}

function useUserById(userId: string): [User, boolean, any] {
    const [userById, setUserById] = useState<User>({
        userName: "",
        firstname: "",
    })
    const [loadingUserById, setLoadingUserById] = useState(true)
    const [errorUserById, setErrorUserById] = useState()

    const [baseUrl] = useBaseUrl(`/API/identity/user/`);

    useEffect(() => {
        if (userId && baseUrl) {
            axios.get(baseUrl + userId, {
                withCredentials: true,
            }).then((response) => {
                setUserById(response.data);
                setLoadingUserById(false);
            }).catch((error) => {
                setErrorUserById(error);
            });
        }
    }, [userId]);

    return [userById, loadingUserById, errorUserById]
}

export {getUserById, useUserById}