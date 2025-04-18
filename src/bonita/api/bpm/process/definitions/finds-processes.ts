/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/Process/operation/searchProcesses
 */

import {default as axios, getBaseUrl} from "@/lib/axios-instance";
import buildUrlParameter from "@/bonita/lib/build-url-parameter";
import {ProcessDefinition} from "@/bonita/api/bpm/archived-process-instance/types";

async function searchProcesses(
    p: number = 0,
    c: number = 20,
    f: string,
    o: string,
    s: string | null,
): Promise<ProcessDefinition[]> {
    let url = <string>getBaseUrl('/API/bpm/process', window.location.hostname)
    let processes: ProcessDefinition[] = [];

    url = buildUrlParameter(url, p, c, f, o, s, null);

    await axios.get(url,
        {
            withCredentials: true,
        }).then((response) => {
        processes = response.data;
    });

    return processes;
}

/**
 * Find processes
 * @param searchOptions
 * @return {Promise<any>} response data
 */
function useProcesses(p = 0,
                      c = 10,
                      f = "",
                      o = "",
                      s = "",) {
    return axios.get(
        <string>getBaseUrl("/API/bpm/process/", window.location.hostname),
        {
            withCredentials: true,
        }).then((response) => {
        return response.data;
    });
}

export {
    searchProcesses,
    useProcesses,
}