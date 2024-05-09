import KeistarItem from "@/components/keistar-ui/types/item-interface";
import Country_BDM from "@/app/types/country-bdm-interface";
import Travel_Reason from "@/app/workspace/office/travel/types/travel-reason-interface";

export default interface Travel_Item extends KeistarItem {
    totalDays?: number;
    country?: Country_BDM;
    location?: string;
    startDate?: string;
    endDate?: string;
    perDiemAdvance?: number;
    perDiemOthers?: number;
    perDiemTotal?: number;
    reasons?: Travel_Reason[];
    status?: string,
    totalDays_string?: string,
    perDiemAdvance_string?: string,
    perDiemOthers_string?: string,
    perDiemTotal_string?: string,
    additionalPerDiem?: number,
    additionalPerDiem_string?: string,
    advancedPayment?: number,
    advancedPayment_string?: string,
    createdDate?: string,
    updatedDate?: string,
    managerApproved?: boolean,
    actualAdvancedPayment?: number,
    actualAdvancedPayment_string?: string,
    cancelReason?: string,
    isCancel?: boolean,
    ceoApproved?: boolean,
    rejectComment?: string,
    approveComment?: string,
    ceoRejectComment?: string,
    ceoApproveComment?: string,
    alreadySubmitClaim?: boolean,
}