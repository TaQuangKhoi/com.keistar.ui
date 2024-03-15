/**
 * @url https://api-documentation.bonitasoft.com/latest/#tag/UserTask/operation/executeUserTask
 */

import {default as axios} from "@/lib/axios-instance";

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
    return await axios.post(`/API/bpm/userTask/${taskId}/execution?assign=${isAssign}`, data, {
        withCredentials: true,
    }).then((response) => {
        return response.data;
    });
}

export {executeUserTask}