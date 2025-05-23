import KeistarItem from "@/components/keistar-ui/types/item-interface";

export interface AssetInterface extends KeistarItem {
    name?: string;
    assetLocation?: string;
}

export default interface CarBookingInterface extends KeistarItem {
    status?: string;
    fromDate?: string;
    toDate?: string;
    purpose?: string;
    asset?: AssetInterface;

    receivedDate?: string;
    beforeKm?: number;

    returnedDate?: string;
    afterKm?: number;

    // Attributes for the form only
    fromTime?: string;
    toTime?: string;
}