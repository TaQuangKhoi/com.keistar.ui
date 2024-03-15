/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/UserTask/operation/getContextByUserTaskId
 */
import {useState, useEffect} from 'react';

import {default as axios, getBaseUrl} from "@/lib/axios-instance";

async function getContextByUserTaskId(taskId: string) {
    return await axios.get(getBaseUrl(`/API/bpm/userTask/${taskId}/context`, window.location.hostname), {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}

async function useGetContextByUserTaskId(taskId: string) {
    const [context, setContext] = useState()
    useEffect(() => {
        getContextByUserTaskId(taskId).then((data) => {
            setContext(data)
        })
    }, []);
    return context
}

export {getContextByUserTaskId, useGetContextByUserTaskId}