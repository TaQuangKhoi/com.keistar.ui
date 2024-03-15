/**
 * url: https://api-documentation.bonitasoft.com/latest/#tag/Session/operation/getSession
 */

import { useEffect, useState} from 'react';
import axios from 'axios'

const url = process.env.NEXT_PUBLIC_BONITA_URL + '/API/system/session/unusedId'

async function getCurrentUserSession() {
    return await axios.get(url, {
        withCredentials: true,
    });
}

const useSession = () => {
    const [data, setData] = useState<Session>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(url, {
                    withCredentials: true,
                });
                setData(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return {
        data,
        loading,
    };
}

export {getCurrentUserSession, useSession}