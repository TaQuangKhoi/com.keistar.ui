import KeistarItem from "@/components/keistar-ui/types/item-interface";

export default interface OT_Item extends KeistarItem {
    employee: {
        persistenceId_string: string,
    },
    approver: {
        persistenceId_string: string,
    },
    startDate: string,
    endDate: string,
    amFromHours: string,
    amToHours: string,
    pmFromHours: string,
    pmToHours: string,
    totalHour: number,
    status?: string,
    reasons: any[],
    cancelReason?: string,
    approverComment?: string,
}