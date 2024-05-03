import { atomWithImmer } from 'jotai-immer';
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";

export const selectedOtAtom = atomWithImmer<OT_Item>({
    total_hours: "",
})