import {default as axios, getBaseUrl} from "@/lib/axios-instance";

function isStartOfQueryString(url: string) {
    return url.indexOf("?") === -1;
}

/**
 * Finds HumanTasks with pagination params and filters
 * @param c maximum number of elements to retrieve
 * @param d get deep object
 *
 * @link https://api-documentation.bonitasoft.com/latest/#tag/HumanTask/operation/searchHumanTasks
 */
async function findsHumanTasks(
    p: number = 0,
    c: number = 20,
    f: string,
    o: string,
    s: string | null,
    d: string[] | null = null
) {
    let url = getBaseUrl('/API/bpm/humanTask', window.location.hostname)

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

    if (d) {
        d.forEach((value) => {
            if (isStartOfQueryString(url)) {
                url = url.concat(`?d=${value}`);
            } else {
                url = url.concat(`&d=${value}`);
            }
        });
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