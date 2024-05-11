import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import ProcessFormShell from "@/app/workspace/tasks/components/process-form-shell";
import {Separator} from "@/components/ui/separator";
import CarBookingFragment from "@/app/workspace/office/car-booking/car-booking-fragment";
import useFormItem from "@/app/workspace/hooks/use-form-item";
import {selectedCarBookingAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-selected-atom";

export default function CarBookingForm({task}: { task: FullHumanTask }) {
    useFormItem({
        taskId: task.id,
        selectedItemAtom: selectedCarBookingAtom,
        refName: "newCarBooking_ref",
    })

    return <>
        <ProcessFormShell>
            <CarBookingFragment isInForm={true}/>
        </ProcessFormShell>
        <Separator className="mt-auto"/>
    </>
}