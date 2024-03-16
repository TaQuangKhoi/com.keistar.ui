/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/UserTask/operation/getContextByUserTaskId
 */
import {useState, useEffect} from 'react';

import {default as axios, getBaseUrl, useBaseUrl} from "@/lib/axios-instance";

async function getContextByUserTaskId(taskId: string) {
    return await axios.get(`/API/bpm/userTask/${taskId}/context`, {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}

async function useGetContextByUserTaskId(taskId: string) {
    const url = useBaseUrl(`/API/bpm/userTask/${taskId}/context`);

    const [context, setContext] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    function fetchData() {
        axios.get(url, {
            withCredentials: true,
        }).then((response) => {
            setContext(response.data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchData();
    }, [taskId]);

    return {
        context,
        loading,
        error
    };
}

export {getContextByUserTaskId, useGetContextByUserTaskId}