/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/UserTask/operation/executeUserTask
 */

import {default as axios, getBaseUrl} from "@/lib/axios-instance";

/**
 * Execute a user task
 * @param taskId
 * @param data
 * @param isAssign
 * @return {Promise<any>} response data
 */
async function executeUserTask(
    taskId: string,
    data: any,
    isAssign: boolean = false
) {
    return await axios.post(
        <string>getBaseUrl(`/API/bpm/userTask/${taskId}/execution?assign=${isAssign}`, window.location.hostname),
        data, {
            withCredentials: true,
        }).then((response) => {
        return response;
    });
}

export {executeUserTask}