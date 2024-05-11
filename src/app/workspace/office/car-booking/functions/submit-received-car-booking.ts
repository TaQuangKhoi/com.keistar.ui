import {executeUserTask} from "@/bonita/api/bpm/user-task/definitions/execute-the-user-task";
import {toast} from "sonner";

export default function submitReceiveCarBooking(
    taskId: string,
    selectedItem: any,
) {
    executeUserTask(taskId, {
            carBookingInput: {
                beforeKm: selectedItem.beforeKm,
                receivedDate: selectedItem.receivedDate,
            },
        }, true
    ).then(response => {
        if (response.status === 204) {
            toast.success("Car booking has been received successfully",
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