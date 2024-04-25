import {atom} from 'jotai'
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";

export const selectedOT = atom<OT_Item>({
    ID: 1,
    total_hours: "8.00",
})