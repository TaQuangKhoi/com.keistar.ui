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
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>
                </div>
                <TooltipProvider delayDuration={0}>
                    <TaskList/>
                </TooltipProvider>
            </div>
        </>
    )
}
