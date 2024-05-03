import {NewE_leaveForm} from "@/app/workspace/office/e-leave/new-e-leave/new-e-leave-form-2";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Create New E-Leave',
    description: 'Create New E-Leave Form for Employee',
}

export default function NewE_leavePage() {
    return (
        <div className="container">
            <div className="flex justify-between mb-4 mt-4">
                <h1 className="text-2xl font-bold">New E-Leave</h1>
            </div>
            <NewE_leaveForm/>
        </div>
    )
}