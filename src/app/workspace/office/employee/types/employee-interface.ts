import KeistarItem from "@/components/keistar-ui/types/item-interface";

export default interface Employee_Item extends KeistarItem {
    id: number,
    phone?: string,
    username?: string,
    firstname?: string,
    lastname?: string,
    engine_id?: number,
}