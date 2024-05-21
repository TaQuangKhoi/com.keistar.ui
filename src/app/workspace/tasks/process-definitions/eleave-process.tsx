import ReviewEleaveForm from "@/app/workspace/office/e-leave/review-eleave-form";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import {KeistarTaskDefinition} from "@/app/workspace/tasks/process-definitions/keistar-task-definition-interface";

export const e_leaveProcessTaskDefinitions: KeistarTaskDefinition[] = [
    {
        taskName: "Review E-leave",
        component: (task: FullHumanTask) => <ReviewEleaveForm task={task}/>,
    }
];