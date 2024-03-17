import {default as axios, getBaseUrl} from "@/lib/axios-instance";
import buildUrlParameter from "@/bonita/lib/build-url-parameter";



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
    let url = <string>getBaseUrl('/API/bpm/humanTask', window.location.hostname)

    url = buildUrlParameter(url, p, c, f, o, s, d);

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