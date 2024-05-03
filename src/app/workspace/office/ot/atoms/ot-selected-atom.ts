import {atomWithImmer} from 'jotai-immer';
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";

export const selectedOtAtom = atomWithImmer<OT_Item>({
    amFromHours: "",
    amToHours: "",
    approver: {persistenceId_string: ""},
    employee: {persistenceId_string: ""},
    endDate: "",
    pmFromHours: "",
    pmToHours: "",
    reason: "",
    startDate: "",
    totalHour: 0
})