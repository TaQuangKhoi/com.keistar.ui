import {executeUserTask} from "@/bonita/api/bpm/user-task/definitions/execute-the-user-task";
import {toast} from "sonner";

export default function submitReviewCarBooking(
    taskId : string,
    comment: string,
    isApproved: boolean,
) {
    executeUserTask(taskId, {
            isApproved: isApproved,
            managerComment: comment
        }, true
    ).then(response => {
        if (response.status === 204) {
            toast.success("Car booking has been " + (isApproved ? "approved" : "rejected"),
                {duration: 3000})
        }
    }).catch(e => {
        toast.error("Error: " + e,
            {
                position: "top-right"
            }
        )
    })
}