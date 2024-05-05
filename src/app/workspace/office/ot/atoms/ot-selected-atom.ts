import {atomWithImmer} from 'jotai-immer';
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";

export const selectedOtAtom = atomWithImmer<OT_Item>({
    persistenceId_string: "",
    amFromHours: "",
    amToHours: "",
    approver: {persistenceId_string: ""},
    employee: {persistenceId_string: ""},
    endDate: new Date().toISOString(),
    pmFromHours: "",
    pmToHours: "",
    reasons: [],
    startDate: new Date().toISOString(),
    totalHour: 0
})