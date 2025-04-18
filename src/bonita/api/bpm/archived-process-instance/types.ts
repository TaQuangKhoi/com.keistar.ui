interface User {
    firstname?: string,
    icon?: string,
    creation_date?: string,
    userName?: string,
    title?: string,
    created_by_user_id?: string,
    enabled?: string,
    lastname?: string,
    last_connection?: string,
    password?: string,
    manager_id?: string,
    id?: string,
    job_title?: string,
    last_update_date?: string
}

interface ProcessDefinition {
    actorinitiatorid: string,
    activationState: string,
    configurationState: string,
    deployedBy: string,
    deploymentDate: string,
    description: string,
    displayDescription: string,
    displayName: string,
    id: string,
    last_update_date: string,
    name: string,
    version: string,
}

interface ArchivedProcessInstance {
    end_date: string,
    archivedDate: string,
    searchIndex5Label: string,
    processDefinitionId: ProcessDefinition,
    searchIndex3Value: string,
    searchIndex4Value: string,
    searchIndex2Label: string,
    start: string,
    searchIndex1Value: string,
    sourceObjectId: string,
    searchIndex3Label: string,
    startedBySubstitute: User,
    searchIndex5Value: string,
    searchIndex2Value: string,
    rootCaseId: string,
    id: string,
    state: string,
    searchIndex1Label: string,
    started_by: User,
    searchIndex4Label: string,
    last_update_date: string,
}

export default ArchivedProcessInstance;

export type {
    User,
    ProcessDefinition,
}