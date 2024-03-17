import {default as axios, getBaseUrl} from "@/lib/axios-instance";

interface ProcessInstantiationResponse {
    caseId: string;
}

function getProcess(processId: string) {
    return process.env.NEXT_PUBLIC_BONITA_URL + "/API/bpm/process/" + processId;
}

async function instantiateProcess(processId: string, contractInputs: any) {
    return await axios.post(
        <string>getBaseUrl("/API/bpm/process/", window.location.hostname) + processId + "/instantiation",
        contractInputs, {
            withCredentials: true,
        }
    ).then((response) => {
        return response.data;
    })
}

export {
    getProcess,
    instantiateProcess,
}