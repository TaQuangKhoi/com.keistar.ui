import {Metadata} from "next"
import * as React from "react";
import TaskList from "@/app/examples/mail/components/task-list";
import {TooltipProvider} from "@/components/ui/tooltip"

export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
}

export default async function TaskPage() {
    return (
        <div className="h-full">
            <TooltipProvider delayDuration={0}>
                <TaskList/>
            </TooltipProvider>
        </div>
    )
}
