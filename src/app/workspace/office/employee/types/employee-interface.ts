import KeistarItem from "@/components/keistar-ui/types/item-interface";

export default interface Employee_Item extends KeistarItem {
    persistenceId: number,
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
    directManagerId?: number,
    createdBy?: string,
    createdDate?: string,
    dateOfBirth?: string
}