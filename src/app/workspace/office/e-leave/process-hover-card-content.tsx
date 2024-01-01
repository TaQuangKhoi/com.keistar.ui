'use client';

import {useEffect, useState} from "react";
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

export default function ProcessHoverCardContent(
    {
        persistenceId_string
    } : {
        persistenceId_string: string
    }
) {
    const [archivedProcessInstances, setArchivedProcessInstances] = useState([] as ArchivedProcessInstance[])

    useEffect(() => {
        async function prepareData() {
            const processes = await getProcessesByEleaveId(persistenceId_string);
            setArchivedProcessInstances(processes)
        }

        prepareData();
    }, []);
    return (
        <div>
            {archivedProcessInstances.map((instance: ArchivedProcessInstance) => (
                <>
                    <div>{instance.state}</div>
                    <div>{instance.id}</div>
                </>
            ))}
            {
                archivedProcessInstances.length === 0 && (
                    <div>No process found</div>
                )
            }
        </div>
    )
}