/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/Process/operation/getProcessContractById
 */

import {default as axios, getBaseUrl} from "@/lib/axios-instance";

/**
 * Returns the process contract for the given ID
 * @param processId
 */
export default async function getProcessContractById(processId: string): Promise<any> {
    const url = <string>getBaseUrl('/API/bpm/process/' + processId + '/contract')
    return await axios.get(url, {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}