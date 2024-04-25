import {atom} from 'jotai'
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";

export const selectedOT = atom<OT_Item>({
    ID: 0,
    total_hours: "",
})