import {User, ProcessDefinition} from "@/bonita/api/bpm/archived-process-instance/types";

interface ProcessInstance {
    id: number,
    end_date: string,
    /** 9 */
    failedFlowNodes: number,
    startedBySubstitute: User | number,

    /** Example: "2014-11-27 17:55:00.906" */
    start: string,

    /** "9" */
    activeFlowNodes: string,
    /** "started" */
    state: string,
    /** "1" */
    rootCaseId: string,
    started_by: User | number,
    processDefinitionId: ProcessDefinition,
    /** Example: "2014-11-27 17:55:00.906" */
    last_update_date: string,

    /** "mySearchIndex1Label" */
    searchIndex1Label: string,
    searchIndex2Label: string,
    searchIndex3Label: string,
    searchIndex4Label: string,
    searchIndex5Label: string,
    searchIndex1Value: string,
    searchIndex2Value: string,
    searchIndex3Value: string,
    searchIndex4Value: string,
    searchIndex5Value: string
}

export type {
    ProcessInstance,
};