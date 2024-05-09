import {atomWithImmer} from 'jotai-immer';
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";
import OT_Reason from "@/app/workspace/office/ot/types/ot-reason-interface";

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