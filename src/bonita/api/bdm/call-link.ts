import {default as axios, getBaseUrl} from "@/lib/axios-instance";

export default async function callLink(href: string) {
    if (!href.startsWith("/")) {
        href = "/" + href;
    }

    return await axios.get(getBaseUrl(href), {
        // withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}