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
import ReceiveCarInputSubmitTask from "@/app/workspace/office/car-booking/components/receive-car-input-submit-task";
import submitReceiveCarBooking from "@/app/workspace/office/car-booking/functions/submit-received-car-booking";
import ReturnCarInputSubmitTask from "@/app/workspace/office/car-booking/components/return-car-input-submit-task";
import submitReturnCarBooking from "@/app/workspace/office/car-booking/functions/submit-return-car-booking";

export default function CarBookingForm({task}: { task: FullHumanTask }) {
    useFormItem({
        taskId: task.id,
        selectedItemAtom: selectedCarBookingAtom,
        refName: "newCarBooking_ref",
    })
    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);
    const [selectedItem,] = useAtom(selectedCarBookingAtom);


    return <>
        <ProcessFormShell>
            <CarBookingFragment isInForm={true} task={task}/>
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
                                          onClick: async (e,) => {
                                              e.preventDefault()
                                              submitReceiveCarBooking(task.id, selectedItem)
                                              setTasksLoadingAtomValue(true);
                                          }
                                      },
                                  ]}
                                  isCommentRequired={false}
                >
                    <ReceiveCarInputSubmitTask/>
                </TaskSubmitFooter>
            )
        }
        {
            task.name === "Return Car" && (
                <TaskSubmitFooter task={task}
                                  buttons={[
                                      {
                                          label: "Return Car",
                                          onClick: async (e,) => {
                                              e.preventDefault()
                                              submitReturnCarBooking(task.id, selectedItem)
                                              setTasksLoadingAtomValue(true);
                                          }
                                      },
                                  ]}
                                  isCommentRequired={false}
                >
                    <ReturnCarInputSubmitTask/>
                </TaskSubmitFooter>
            )
        }
    </>
}