import {atom} from "jotai";
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";

export const otListAtom = atom<OT_Item[]>([])