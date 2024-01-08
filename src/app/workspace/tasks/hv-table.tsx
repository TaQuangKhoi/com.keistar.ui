'use client';

import {columns} from "@/app/workspace/tasks/components/columns";
import {DataTable} from "@/app/workspace/tasks/components/data-table";
import {findsHumanTasks} from "@/bonita/api/bpm/human-task/definitions";
import {z} from "zod";
import {Task, taskSchema} from "@/app/workspace/tasks/data/schema";
import {useEffect, useState} from "react";

async function getTasks() {
    // const data = await fs.readFile(
    //     path.join(process.cwd(), "src/app/workspace/tasks/data/tasks.json")
    // )

    const data = await findsHumanTasks(
        0,
        50,
        "", //user_id%3D815
        "displayName%20ASC",
        null
    );

    return z.array(taskSchema).parse(data)
}

export default function HvTable() {
    const [tasks, setTasks] = useState<Task[]>()

    useEffect(() => {
        getTasks().then((tasks) => {
            setTasks(tasks)
        })
    }, [])

    if (!tasks) {
        return <div>Loading...</div>
    } else {
        return (
            <DataTable
                columns={columns}
                data={tasks}
            />
        )
    }
}