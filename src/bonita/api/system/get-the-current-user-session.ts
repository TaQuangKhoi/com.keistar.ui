/**
 * url: https://api-documentation.bonitasoft.com/latest/#tag/Session/operation/getSession
 */

import {useEffect, useState} from 'react';
import axios from 'axios'
import {default as axios2, getBaseUrl} from "@/lib/axios-instance";

async function getCurrentUserSession(hostname = process.env.NEXT_PUBLIC_BONITA_HOSTNAME) {
    return await axios.get(getBaseUrl('/API/system/session/unusedId', hostname),
        {
            withCredentials: true,
        });
}

const useSession = (hostname = process.env.NEXT_PUBLIC_BONITA_HOSTNAME) => {
    const [data, setData] = useState<Session>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: response} = await axios2.get(getBaseUrl('/API/system/session/unusedId', hostname), {
                    withCredentials: true,
                });
                setData(response);
            } catch (error: any) {
                setError(error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return {
        data,
        loading,
        error
    };
}

export {getCurrentUserSession, useSession}