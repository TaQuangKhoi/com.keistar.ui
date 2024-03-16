/**
 * url: https://api-documentation.bonitasoft.com/latest/#tag/Session/operation/getSession
 */

import {useEffect, useState} from 'react';
import axios from 'axios'
import {default as axios2, getBaseUrl, useBaseUrl} from "@/lib/axios-instance";

async function getCurrentUserSession(hostname = process.env.NEXT_PUBLIC_BONITA_HOSTNAME) {
    return await axios.get(<string>getBaseUrl('/API/system/session/unusedId', hostname),
        {
            withCredentials: true,
        });
}

const useSession = (): [Session, boolean, any] => {
    const [session, setSession] = useState<Session>({});
    const [loadingSession, setLoadingSession] = useState(true);
    const [errorSession, setErrorSession] = useState();

    const [baseUrl] = useBaseUrl('/API/system/session/unusedId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof baseUrl === "string") {
                    const {data: response} = await axios2.get(baseUrl, {
                        withCredentials: true,
                    });
                    setSession(response);
                }
            } catch (error: any) {
                setErrorSession(error);
            }
            setLoadingSession(false);
        };

        fetchData();
    }, [baseUrl]);

    return [session, loadingSession, errorSession];
}

export {getCurrentUserSession, useSession}