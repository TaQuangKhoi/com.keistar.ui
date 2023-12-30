'use client'

import {Button} from "@/components/ui/button";
import {getProcessesByEleaveId} from "@/app/workspace/office/e-leave/process-hover-card-content";

export default function TestComponent() {

    return (
        <Button onClick={() => getProcessesByEleaveId("143")}>
            Test Button
        </Button>
    )
}