/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/UserTask/operation/getContextByUserTaskId
 */
import {useState, useEffect} from 'react';

import {default as axios, useBaseUrl} from "@/lib/axios-instance";

function useGetContextByUserTaskId(taskId: string): [any, boolean, any] {
    const [baseUrl] = useBaseUrl(`/API/bpm/userTask/${taskId}/context`);

    const [context, setContext] = useState()
    const [loadingContext, setLoadingContext] = useState(true);
    const [errorContext, setErrorContext] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof baseUrl === "string") {
                    const {data: response} = await axios.get(baseUrl, {
                        withCredentials: true,
                    });
                    setContext(response);
                    setLoadingContext(false);
                }
            } catch (error: any) {
                setErrorContext(error);
            }
        };

        if (baseUrl && taskId) {
            fetchData();
        }
    }, [taskId, baseUrl]);

    return [context, loadingContext, errorContext];
}

export {useGetContextByUserTaskId}