export default interface FormMappingInterface {
    id: number,
    processDefinitionId: number,
    type: string,
    target: string,
    task: string,
    pageId: number | null,
    pageMappingKey: string,
    lastUpdatedBy: number,
    lastUpdateDate: number,
    url: string,
}
