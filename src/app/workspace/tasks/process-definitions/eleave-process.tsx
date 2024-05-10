import ReviewEleaveForm from "@/app/workspace/office/e-leave/review-eleave-form";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import React from "react";

export interface KeistarTaskDefinition {
    taskName: string;
    component: (task: FullHumanTask) => React.ReactElement;
}

export const e_leaveProcessTaskDefinitions: KeistarTaskDefinition[] = [
    {
        taskName: "Review E-leave",
        component: (task: FullHumanTask) => <ReviewEleaveForm task={task}/>,
    }
];