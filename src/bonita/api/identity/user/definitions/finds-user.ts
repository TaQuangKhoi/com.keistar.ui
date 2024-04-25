/**
 * Finds Users with pagination params and filters
 */
import {getBaseUrl} from "@/lib/axios-instance";
import {default as axios, getBaseUrl, useBaseUrl} from "@/lib/axios-instance";

async function findsUser(
    p: number,
    c: number,
    filters: string,
) {
    return await axios.get(getBaseUrl(`/API/identity/user/`, process.env.NEXT_PUBLIC_BONITA_HOSTNAME), {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}