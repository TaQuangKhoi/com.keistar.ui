import {atom} from "jotai";
import Travel_Item from "@/app/workspace/office/travel/types/travel-interface";

export const travelListAtom = atom<Travel_Item[]>([])