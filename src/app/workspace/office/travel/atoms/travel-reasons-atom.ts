import {atom} from "jotai";
import Travel_Reason from "@/app/workspace/office/travel/types/travel-reason-interface";

export const travelReasonsAtom = atom<Travel_Reason[]>([])