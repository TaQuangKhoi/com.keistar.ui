export default interface E_leave {
    persistenceId?: number | any,
    persistenceId_string?: string | any,
    persistenceVersion?: number | any,
    persistenceVersion_string?: string | any,
    status?: any,
    startDate?: string | any,
    endDate?: string | any,
    totalDays?: number | any,
    totalDays_string?: string | any,
    reason?: string | any,
    isApprove?: any,
    isCancel?: any,
    isReject?: any,
    requestor?: any,
    cancelReason?: any,
    cancelDate?: any,
    approveDate?: any,
    rejectDate?: any,
    approveComment?: any,
    rejectComment?: any,
    createdDate?: string | any,
    createdBy?: number | any,
    createdBy_string?: string | any,
    leaveType?:
        {
            persistenceId?: number,
            persistenceId_string?: string,
            persistenceVersion?: number,
            persistenceVersion_string?: string,
            name?: string,
            description?: string,
            isActive?: boolean,
        },
    links?: [
        {
            "rel": string, // "employee"
            "href": string, // "/API/bdm/businessData/com.havako.model.office.Eleave/146/employee"
        },
        {
            "rel": string, // "leaveType"
            "href": string, // "/API/bdm/businessData/com.havako.model.office.Eleave/146/leaveType"
        }
    ],
}