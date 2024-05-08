import KeistarItem from "@/components/keistar-ui/types/item-interface";
import Country_BDM from "@/app/types/country-bdm-interface";

export default interface Travel_Item extends KeistarItem {
    totalDays?: number;
    country?: Country_BDM;
    location?: string;
}