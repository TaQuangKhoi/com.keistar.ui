import KeistarItem from "@/components/keistar-ui/types/item-interface";

export default interface Employee_Item extends KeistarItem {
    persistenceId_string?: string,
    phone?: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    engine_id?: number,
    status?: string,
    email?: string,
    workplaceId?: string,
    positionName?: string,
    contractTypeId?: string,
    workTypeId?: string,
    probationStartDate?: string,
    probationEndDate?: string,
    hrManagerAcceptance?: boolean,
    hrManagerComment?: string,
    directManagerComment?: string,
    isActive?: boolean,
    employeeTypeId?: string,
    createdBy?: string,
    createdDate?: string,
    dateOfBirth?: string,
    directManager_persistenceId: string,
    r1Date?: string,
    r2Date?: string,
}