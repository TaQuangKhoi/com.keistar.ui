import {KeistarTaskDefinition} from "@/app/workspace/tasks/process-definitions/keistar-task-definition-interface";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import CarBookingForm from "@/app/workspace/office/car-booking/car-booking-form";

export const carBookingProcessTaskDefinitions: KeistarTaskDefinition[] = [
    {
        taskName: "Approve Car Booking",
        component: (task: FullHumanTask) => <CarBookingForm task={task}/>,
    }
];