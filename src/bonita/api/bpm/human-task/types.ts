interface HumanTask {
    displayDescription: string | null,
    executedBySubstitute: number,
    /** 5826139717723008000 */
    processId: number,
    parentCaseId: number,

    /** "ready" */
    state: string,
    rootContainerId: number,

    /** "USER_TASK" */
    type: string,
    assigned_id: null,
    assigned_date: null,
    id: number,
    executedBy: number,
    caseId: number,

    /** "normal" */
    priority: string,
    actorId: number,
    description: null,
    name: string,
    reached_state_date: string,
    rootCaseId: number,
    displayName: string,
    parentTaskId: number,
    dueDate: string,
    last_update_date: string
}

export type {
    HumanTask,
};