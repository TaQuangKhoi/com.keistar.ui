import {e_leaveProcessTaskDefinitions} from "@/app/workspace/tasks/process-definitions/eleave-process";
import {travelProcessTaskDefinitions} from "@/app/workspace/tasks/process-definitions/travel-process";
import {carBookingProcessTaskDefinitions} from "@/app/workspace/tasks/process-definitions/car-booking-process";
import {otProcessTaskDefinitions} from "@/app/workspace/tasks/process-definitions/ot-process";
import {employeeProcessTaskDefinitions} from "@/app/workspace/tasks/process-definitions/employee-process";

export const processDefRoute = [
    {
        processName: "Create_Eleave",
        taskDefinitions: e_leaveProcessTaskDefinitions,
    },
    {
        processName: "Create_TravelRequest",
        taskDefinitions: travelProcessTaskDefinitions,
    },
    {
        processName: "Create_Car_Booking",
        taskDefinitions: carBookingProcessTaskDefinitions,
    },
    {
        processName: "Create_OT",
        taskDefinitions: otProcessTaskDefinitions,
    },
    {
        processName: "Create_Employee",
        taskDefinitions: employeeProcessTaskDefinitions,
    },
]
