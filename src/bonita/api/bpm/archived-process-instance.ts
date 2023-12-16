// Docs: https://api-documentation.bonitasoft.com/latest/#tag/ArchivedProcessInstance

import {default as axios} from "@/lib/axios-instance";

/**
 * Finds ArchivedProcessInstances with pagination params and filters
 * @param c
 * @param p
 */
async function findsArchivedProcessInstances(
    c: number = 10,
    p: number = 0,
) {
    /**
     * &d=processDefinitionId
     * &d=started_by
     * &d=startedBySubstitute
     */
    const d = [
        "processDefinitionId",
        "started_by",
        "startedBySubstitute",
    ];


    const url = `/API/bpm/archivedCase?c=${c}&p=${p}&d=${d.join('&d=')}&t=${Date.now()}`;
    // &t=1702735350005

    return await axios.get(url, {
            withCredentials: true,
        }
    ).then((response) => {
        return response.data;
    })
}

export {
    findsArchivedProcessInstances,
}