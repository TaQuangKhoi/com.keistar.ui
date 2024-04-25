import KeistarItem from "@/components/keistar-ui/types/item-interface";

export default interface OT_Item extends KeistarItem {
    ID: number,
    total_hours: string,
    phone: string,
}