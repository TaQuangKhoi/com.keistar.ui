/**
 * Finds Users with pagination params and filters
 */
import {default as axios, getBaseUrl} from "@/lib/axios-instance";

export default async function findsUser(
    p: number = 0,
    c: number = 10,
    f: string,
    o: string,
    s: string, // search on attributes
) {
    const url = `/API/identity/user?p=${p}&c=${c}&f=${f}&o=${o}&s=${s}`;
    return await axios.get(getBaseUrl(url), {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}