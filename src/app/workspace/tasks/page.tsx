import {promises as fs} from "fs"
import path from "path"
import {Metadata} from "next"
import {z} from "zod"

import {DataTable} from "./components/data-table"
import {taskSchema} from "./data/schema"
import {columns} from "./components/columns";
import {findsHumanTasks} from "@/bonita/api/bpm/human-task/definitions";
import HvTable from "@/app/workspace/tasks/hv-table";

export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
}

export default async function TaskPage() {
    // const tasks = await getTasks()

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
                <HvTable/>
            </div>
        </>
    )
}
