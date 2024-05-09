import KeistarItem from "@/components/keistar-ui/types/item-interface";
import OT_Reason from "@/app/workspace/office/ot/types/ot-reason-interface";

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
    reasons: OT_Reason[],
    cancelReason?: string,
    approverComment?: string,
}