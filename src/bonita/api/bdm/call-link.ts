import {default as axios, getBaseUrl} from "@/lib/axios-instance";

export default async function callLink(href: string) {
    return await axios.get(getBaseUrl(href), {
        // withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}