/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/UserTask/operation/getContextByUserTaskId
 */
import {useState, useEffect} from 'react';

import {default as axios} from "@/lib/axios-instance";

async function getContextByUserTaskId(taskId: string) {
    return await axios.get(`/API/bpm/userTask/${taskId}/context`, {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}

async function useGetContextByUserTaskId(taskId: string) {
    const [context, setContext] = useState()
    useEffect(() => {
        getContextByUserTaskId(task.id).then((data) => {
            setContext(data)
        })
    }, []);
    return context
}

export {getContextByUserTaskId, useGetContextByUserTaskId}