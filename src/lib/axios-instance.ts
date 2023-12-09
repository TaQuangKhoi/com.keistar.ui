import axios from "axios";
import {watch} from 'valtio/utils';
import {store} from "@/app/valtio-proxy";


const axiosInstance = axios.create({
    baseURL: "http://localhost:28071/bonita/API/",
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
const stop = watch((get) => {
    // 3rd way to set the AUTH token for any request
    axiosInstance.defaults.headers.common["X-Bonita-API-Token"] = get(store).token;
})

/**
 * Set the AUTH token for any request
 */
// 1st way
// axiosInstance.interceptors.response.use(function (config) {
//     config.headers["X-Bonita-API-Token"] = store.token;
//     return config;
// });


// 2nd way
// axios.defaults.headers.common["X-Bonita-API-Token"] = "khoi-nho-hao";

export default axiosInstance;