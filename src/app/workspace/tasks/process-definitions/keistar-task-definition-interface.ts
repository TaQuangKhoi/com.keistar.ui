import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import React from "react";

export interface KeistarTaskDefinition {
    taskName: string;
    component: (task: FullHumanTask) => React.ReactElement;
}