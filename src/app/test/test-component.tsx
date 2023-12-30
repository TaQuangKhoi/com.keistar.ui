'use client'

import {Button} from "@/components/ui/button";
import {
    findsArchivedProcessInstances,
    findsContextByArchivedProcessInstanceID
} from "@/bonita/api/bpm/archived-process-instance/definitions";
import ArchivedProcessInstance from "@/bonita/api/bpm/archived-process-instance/types";

interface ContextRef {
    "name": string, // "newEleave"
    "type": string, // "com.havako.model.office.Eleave"
    "link": string, // "API/bdm/businessData/com.havako.model.office.Eleave/147"
    storageId: number, // 147
    "storageId_string": string, // "147"
}


export default function TestComponent() {
    async function getProcessesByEleaveId(eleaveId: string) {
        console.debug("getProcessesByEleaveId", eleaveId)
        const data: ArchivedProcessInstance[] = await findsArchivedProcessInstances();

        let processInstances: ArchivedProcessInstance[] = [];

        for (let i = 0; i < data.length; i++) {
            const context: ContextRef[] = await findsContextByArchivedProcessInstanceID(data[i].id)

            // List all eleave type object ref
            for (const [key, value] of Object.entries(context)) {
                if (value.type === "com.havako.model.office.Eleave" && value.storageId_string === eleaveId) {
                    processInstances.push(data)
                }
            }
        }

        console.debug(processInstances)
    }

    return (
        <Button onClick={() => getProcessesByEleaveId("143")}>
            Test Button
        </Button>
    )
}