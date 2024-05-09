import {atomWithImmer} from 'jotai-immer';
import Travel_Item from "@/app/workspace/office/travel/types/travel-interface";

export const selectedTravelAtom = atomWithImmer<Travel_Item>({});