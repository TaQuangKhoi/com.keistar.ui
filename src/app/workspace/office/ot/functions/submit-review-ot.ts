import {executeUserTask} from "@/bonita/api/bpm/user-task/definitions/execute-the-user-task";
import {toast} from "sonner";

export default function SubmitReviewOt(taskId: string, comment: string, isApproved: boolean) {
    executeUserTask(taskId, {
            value: {
                isApproved: isApproved,
                approverComment: comment,
            },
        }, true
    ).then(response => {
        let message = isApproved ? "approved" : "rejected";
        if (response.status === 204) {
            toast.success("OT Review " + message, {duration: 3000})
        }
    }).catch(e => {
        toast.error("Error: " + e,
            {
                position: "top-right"
            }
        )
    })
}