import {default as axios} from "@/lib/axios-instance";

function isStartOfQueryString(url: string) {
    return url.indexOf("?") === -1;
}

/**
 * Finds HumanTasks with pagination params and filters
 * @param c maximum number of elements to retrieve
 */
async function findsHumanTasks(
    p: number = 0,
    c: number = 20,
    f: string,
    o: string,
    s: string|null,
) {
    let url = `/API/bpm/humanTask`;

    // Add p to the url if it is not null
    url = url.concat(`?p=${p}`);

    // Add c to the url if it is not null
    url = url.concat(`&c=${c}`);

    // Add f to the url if it is not null
    if (f) {
        if (isStartOfQueryString(url)) {
            url = url.concat(`?f=${f}`);
        } else {
            url = url.concat(`&f=${f}`);
        }
    }

    // Add o to the url if it is not null
    if (o) {
        if (isStartOfQueryString(url)) {
            url = url.concat(`?o=${o}`);
        } else {
            url = url.concat(`&o=${o}`);
        }
    }

    // Add s to the url if it is not null
    if (s) {
        if (isStartOfQueryString(url)) {
            url = url.concat(`?s=${s}`);
        } else {
            url = url.concat(`&s=${s}`);
        }
    }

    return await axios.get(url, {
            withCredentials: true,
        }
    ).then((response) => {
        return response.data;
    })
}

export {
    findsHumanTasks,
}