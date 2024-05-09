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
}