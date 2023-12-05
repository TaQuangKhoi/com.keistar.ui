import {NewE_leaveForm} from "@/app/workspace/office/e-leave/new-e-leave/new-e-leave-form-2";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Create New E-Leave',
    description: 'Khôi nhớ Hảo',
}

export default function NewE_leavePage() {
    return (
        <div className="container">
            <h1>New E-Leave</h1>
            <NewE_leaveForm/>
        </div>
    )
}