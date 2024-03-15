import axios from "axios";
import {watch} from 'valtio/utils';
import {store} from "@/app/valtio-proxy";
import {getCurrentUserSession} from "@/bonita/api/system/get-the-current-user-session";

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_BONITA_URL,
    withCredentials: true,

    // 4th way to set the AUTH token for any request
    // headers: {
    //     "X-Bonita-API-Token": localStorage.getItem('x-bonita-api-token'),
    // },
});

// const unsubscribe = subscribeKey(store, 'token', (v: string) => {
//     console.debug('subscribeKey store.token: ', v);
// });
// unsubscribe();

// Subscribe to all state changes
// const stop = watch((get) => {
//     // 3rd way to set the AUTH token for any request
//     axiosInstance.defaults.headers.common["X-Bonita-API-Token"] = get(store).token;
// })

/**
 * Set the AUTH token for any request
 */
// 1st way
axiosInstance.interceptors.request.use(async function (config) {
    const res = await getCurrentUserSession();
    config.headers["X-Bonita-API-Token"] = res.headers['x-bonita-api-token'];
    return config;
});

/**
 * This func is used in development mode to get the base url
 * @param url
 * @param host
 */
function getBaseUrl(url: string, host: string) {
    if (process.env.NODE_ENV === 'development') {
        return `http://${host}:7123/bonita` + url;
    } else {
        return url;
    }
}
export {getBaseUrl};

export default axiosInstance;