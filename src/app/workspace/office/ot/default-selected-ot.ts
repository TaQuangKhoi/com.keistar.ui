import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";

const defaultOT: OT_Item  = {
    persistenceId: undefined,
    totalHour: 0,
    employee: {
        persistenceId_string: "",
    },
    approver: {
        persistenceId_string: "",
    },
    startDate: "",
    endDate: "",
    amFromHours: "",
    amToHours: "",
    pmFromHours: "",
    pmToHours: "",
    reason: "",
};

export default defaultOT;