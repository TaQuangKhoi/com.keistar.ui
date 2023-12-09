import {default as axios} from "@/lib/axios-instance";

function getProcess(processId: string) {
    return process.env.NEXT_PUBLIC_BONITA_URL + "/API/bpm/process/" + processId;
}

interface ProcessInstantiationResponse {
    caseId: string;
}

async function instantiateProcess(processId: string, contractInputs: any)  {
    const url = getProcess(processId) + "/instantiation";
    return await axios.post(url, contractInputs, {
            withCredentials: true,
        }
    ).then((response) => {
        return response.data;
    })
}

export {
    instantiateProcess,
}