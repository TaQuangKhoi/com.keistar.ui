import {e_leaveProcessTaskDefinitions} from "@/app/workspace/tasks/process-definitions/eleave-process";
import {travelProcessTaskDefinitions} from "@/app/workspace/tasks/process-definitions/travel-process";

export const processDefRoute = [
    {
        processName: "Create_Eleave",
        taskDefinitions: e_leaveProcessTaskDefinitions,
    },
    {
        processName: "Create_TravelRequest",
        taskDefinitions: travelProcessTaskDefinitions,
    },
]
