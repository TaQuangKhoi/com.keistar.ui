import KeistarItem from "@/components/keistar-ui/types/item-interface";
import Country_BDM from "@/app/types/country-bdm-interface";
import Travel_Reason from "@/app/workspace/office/travel/types/travel-reason-interface";
import LinkInterface from "@/bonita/api/types/link-interface";

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
    "persistenceId": 197,
    "persistenceId_string": "197",
    "persistenceVersion": 0,
    "persistenceVersion_string": "0",
    "status": "Waiting for approval",
    "totalDays_string": "3.0",
    "perDiemAdvance_string": "0.0",
    "perDiemOthers_string": "0.0",
    "perDiemTotal_string": "0.0",
    "additionalPerDiem": null,
    "additionalPerDiem_string": null,
    "advancedPayment": null,
    "advancedPayment_string": null,
    "createdDate": null,
    "updatedDate": null,
    "managerApproved": null,
    "actualAdvancedPayment": null,
    "actualAdvancedPayment_string": null,
    "cancelReason": null,
    "isCancel": null,
    "ceoApproved": null,
    "isApprove": null,
    "isReject": null,
    "rejectComment": null,
    "approveComment": null,
    "ceoRejectComment": null,
    "ceoApproveComment": null,
    "alreadySubmitClaim": null,
    "links": LinkInterface[],
}