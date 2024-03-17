import axios from "axios";
import {watch} from 'valtio/utils';
import {store} from "@/app/valtio-proxy";
import {getCurrentUserSession} from "@/bonita/api/system/get-the-current-user-session";
import {useEffect, useState} from "react";

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_BONITA_URL,
    withCredentials: true,
});

/**
 * Set the AUTH token for any request
 */
// 1st way
axiosInstance.interceptors.request.use(async function (config) {
    const res = await getCurrentUserSession(window.location.hostname);
    config.headers["X-Bonita-API-Token"] = res.headers['x-bonita-api-token'];
    return config;
});

/**
 * This func is used in development mode to get the base url
 * @param url
 * @param host
 */
function getBaseUrl(url: string | undefined, host: string | undefined) {
    if (process.env.NODE_ENV === 'development') {
        return `http://${host}:7123/bonita` + url;
    } else {
        return url;
    }
}

export {getBaseUrl};

function useBaseUrl(endpoint: string): [string | undefined, string, React.Dispatch<React.SetStateAction<string>>] {
    const [baseUrl, setBaseUrl] = useState<string>();
    const [endPoint, setEndPoint] = useState<string>(endpoint)

    useEffect(() => {
        // Check if the code is running on the client side
        if (process) {
            setBaseUrl(getBaseUrl(endPoint, window.location.hostname));
        }
    }, [endPoint]);

    return [baseUrl, endPoint, setEndPoint];
}

export {useBaseUrl};

export default axiosInstance;