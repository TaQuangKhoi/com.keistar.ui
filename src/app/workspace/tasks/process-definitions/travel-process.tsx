import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import TravelForm from "@/app/workspace/office/travel/travel-form";

export const travelProcessTaskDefinitions = [
    {
        taskName: "Review Travel",
        component: (task: FullHumanTask) => <TravelForm task={task}/>,
    }
];