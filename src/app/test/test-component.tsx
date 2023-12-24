'use client'

import {Button} from "@/components/ui/button";
import {
    findsArchivedProcessInstances,
    findsContextByArchivedProcessInstanceID
} from "@/bonita/api/bpm/archived-process-instance";
import ArchivedProcessInstance from "@/bonita/api/bpm/archived-process-instance/types";

export default function TestComponent() {
    async function getProcesses() {
        const data = await findsArchivedProcessInstances();
        let ids: string[] = [];
        data.forEach((item: ArchivedProcessInstance) => {
            ids.push(item.id)
        })
        let e_leaves = [];
        for (let i = 0; i < ids.length; i++) {
            console.debug(ids[i])
            const e_leave = await findsContextByArchivedProcessInstanceID(ids[i])
            console.debug(e_leave)
            e_leaves.push(e_leave)
        }
    }

    return (
        <Button onClick={getProcesses}>
            Test Button
        </Button>
    )
}