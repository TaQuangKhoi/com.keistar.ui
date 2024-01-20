import {Metadata} from "next"
import * as React from "react";
import TaskList from "@/app/workspace/tasks/components/task-list";
import {TooltipProvider} from "@/components/ui/tooltip"

export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
}

export default async function TaskPage() {
    return (
        <TooltipProvider delayDuration={0}>
            <TaskList/>
        </TooltipProvider>
    )
}
