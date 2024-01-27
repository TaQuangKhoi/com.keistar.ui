import {ProcessDefinition} from "@/bonita/api/bpm/archived-process-instance/types";

interface HumanTask {
    displayDescription: string | null,
    executedBySubstitute: string,
    /** 5826139717723008000 */
    processId: string,
    parentCaseId: string,

    /** "ready" */
    state: string,

    /** "USER_TASK" */
    type: string,
    assigned_id: string,
    assigned_date: string,
    id: string,
    executedBy: string,
    caseId: string,

    /** "normal" */
    priority: string,
    actorId: string,
    description: string,
    name: string,
    reached_state_date: string,
    rootCaseId: string,
    displayName: string,
    parentTaskId?: number,
    dueDate: string,
    last_update_date: string
}

interface SimpleHumanTask {
    rootContainerId: number,
}

interface FullHumanTask extends HumanTask {
    rootContainerId: ProcessDefinition,
}

export type {
    HumanTask,
    FullHumanTask,
};