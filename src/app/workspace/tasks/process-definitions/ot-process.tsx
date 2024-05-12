
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import React from "react";
import {KeistarTaskDefinition} from "@/app/workspace/tasks/process-definitions/keistar-task-definition-interface";
import OtForm from "@/app/workspace/office/ot/ot-form";

export const otProcessTaskDefinitions: KeistarTaskDefinition[] = [
    {
        taskName: "Review OT",
        component: (task: FullHumanTask) => <OtForm task={task}/>,
    }
];