import {Metadata} from "next"
import * as React from "react";
import Task from "@/app/workspace/tasks/components/task";
import {TooltipProvider} from "@/components/ui/tooltip"

export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
}

export default async function TaskPage() {
    return (
        <TooltipProvider delayDuration={0}>
            <Task/>
        </TooltipProvider>
    )
}
