import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import ProcessFormShell from "@/app/workspace/tasks/components/process-form-shell";
import {Separator} from "@/components/ui/separator";
import CarBookingFragment from "@/app/workspace/office/car-booking/car-booking-fragment";
import useFormItem from "@/app/workspace/hooks/use-form-item";
import {selectedCarBookingAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-selected-atom";
import TaskSubmitFooter from "@/app/workspace/tasks/components/task-submit-footer";
import {useAtom} from "jotai/index";
import {tasksLoadingAtom} from "@/app/workspace/tasks/atoms/tasks-loading-atom";
import submitReviewCarBooking from "@/app/workspace/office/car-booking/functions/submit-review-car-booking";
import KeistarDateTimePicker from "@/app/components/keistar-date-time-picker";
import {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function CarBookingForm({task}: { task: FullHumanTask }) {
    useFormItem({
        taskId: task.id,
        selectedItemAtom: selectedCarBookingAtom,
        refName: "newCarBooking_ref",
    })
    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);


    const [date, setDate] = useState<Date | undefined>()


    return <>
        <ProcessFormShell>
            <CarBookingFragment isInForm={true}/>
        </ProcessFormShell>
        <Separator className="mt-auto"/>

        {
            task.name === "Approve Car Booking" && (
                <TaskSubmitFooter task={task} buttons={[
                    {
                        label: "Approve",
                        onClick: async (e, comment) => {
                            e.preventDefault()
                            submitReviewCarBooking(task.id, comment, true)
                            setTasksLoadingAtomValue(true);
                        }
                    },
                    {
                        label: "Reject",
                        onClick: (e, comment) => {
                            e.preventDefault()
                            submitReviewCarBooking(task.id, comment, false)
                            setTasksLoadingAtomValue(true);
                        }
                    },
                ]}/>
            )
        }
        {
            task.name === "Receive Car" && (
                <TaskSubmitFooter task={task}
                                  buttons={[
                                      {
                                          label: "Receive Car",
                                          onClick: async (e, comment) => {
                                              e.preventDefault()
                                              // submitReviewCarBooking(task.id, comment, true)
                                              setTasksLoadingAtomValue(true);
                                          }
                                      },
                                  ]}
                                  isCommentRequired={false}
                >
                    <Label htmlFor="startDateEndDate">Receive Date</Label>
                    <KeistarDateTimePicker
                        date={date}
                        setDate={setDate}
                        hasTime={true}
                    />
                    <Label htmlFor="startDateEndDate">Before KM</Label>
                    <Input type="number" className="input" placeholder="Enter KM"/>
                </TaskSubmitFooter>
            )
        }
        {
            task.name === "Return Car" && (
                <>Test</>
            )
        }
    </>
}