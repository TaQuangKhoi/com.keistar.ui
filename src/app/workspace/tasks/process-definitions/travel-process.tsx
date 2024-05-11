import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import TravelForm from "@/app/workspace/office/travel/travel-form";
import {KeistarTaskDefinition} from "@/app/workspace/tasks/process-definitions/keistar-task-definition-interface";

export const travelProcessTaskDefinitions: KeistarTaskDefinition[] = [
    {
        taskName: "Review Travel",
        component: (task: FullHumanTask) => <TravelForm task={task}/>,
    },
    {
        taskName: "CEO Review Travel",
        component: (task: FullHumanTask) => <TravelForm task={task}/>,
    },
];