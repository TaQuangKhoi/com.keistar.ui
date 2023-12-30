'use client';

import {useEffect} from "react";
import ArchivedProcessInstance from "@/bonita/api/bpm/archived-process-instance/types";
import {
    findsArchivedProcessInstances,
    findsContextByArchivedProcessInstanceID
} from "@/bonita/api/bpm/archived-process-instance/definitions";

interface ContextRef {
    "name": string, // "newEleave"
    "type": string, // "com.havako.model.office.Eleave"
    "link": string, // "API/bdm/businessData/com.havako.model.office.Eleave/147"
    storageId: number, // 147
    "storageId_string": string, // "147"
}

export async function getProcessesByEleaveId(eleaveId: string) {
    const data: ArchivedProcessInstance[] = await findsArchivedProcessInstances();

    let processInstances: ArchivedProcessInstance[] = [];

    for (let i = 0; i < data.length; i++) {
        const context: ContextRef[] = await findsContextByArchivedProcessInstanceID(data[i].id)

        // List all eleave type object ref
        for (const [key, value] of Object.entries(context)) {
            if (value.type === "com.havako.model.office.Eleave" && value.storageId_string === eleaveId) {
                processInstances.push(data[i])
            }
        }
    }

    return processInstances;
}

export default function ProcessHoverCardContent() {
    useEffect(() => {
        async function prepareData() {
            const processes = await getProcessesByEleaveId("143");
        }

        prepareData();
    }, []);
    return (
        <div>
            Process Hover Card Content
        </div>
    )
}