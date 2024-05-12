import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import {useGetContextByUserTaskId} from "@/bonita/api/bpm/user-task/definitions/finds-context-by-user-task-id";
import {useEffect, useState} from "react";
import callLink from "@/bonita/api/bdm/call-link";
import Travel_Item from "@/app/workspace/office/travel/types/travel-interface";
import {Separator} from "@/components/ui/separator";
import TaskSubmitFooter from "@/app/workspace/tasks/components/task-submit-footer";
import {executeUserTask} from "@/bonita/api/bpm/user-task/definitions/execute-the-user-task";
import {toast} from "sonner";
import {useAtom} from "jotai/index";
import {tasksLoadingAtom} from "@/app/workspace/tasks/atoms/tasks-loading-atom";
import TravelFragment from "@/app/workspace/office/travel/travel-fragment";
import {selectedTravelAtom} from "@/app/workspace/office/travel/atoms/travel-selected-atom";
import ProcessFormShell from "@/app/workspace/tasks/components/process-form-shell";
import useFormItem from "@/app/workspace/hooks/use-form-item";
import KeistarEditableTable from "@/app/components/keistar-editable-table";
import {travelAdvancePaymentAtom} from "@/app/workspace/office/travel/atoms/travel-advance-payment-atom";

export default function TravelForm({task}: { task: FullHumanTask }) {
    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);

    useFormItem({
        taskId: task.id,
        selectedItemAtom: selectedTravelAtom,
        refName: "newTravelRequest_ref",
    })


    const [travelAdvancePayment,] = useAtom(travelAdvancePaymentAtom);


    return <>
        <ProcessFormShell>
            <TravelFragment isInForm={true}/>
        </ProcessFormShell>


        <Separator className="mt-auto"/>

        {
            task.name === "Review Travel" && (
                <TaskSubmitFooter task={task} buttons={[
                    {
                        label: "Approve",
                        onClick: (e, comment) => {
                            e.preventDefault()

                            executeUserTask(task.id, {
                                    newTravelRequestInput: {
                                        managerApproved: true,
                                        approveComment: comment,
                                        rejectComment: "",
                                    }
                                }, true
                            ).then(response => {
                                if (response.status === 204) {
                                    toast.success("Travel has been approved",
                                        {duration: 3000})
                                }
                            }).catch(e => {
                                toast.error("Error: " + e,
                                    {
                                        position: "top-right"
                                    }
                                )
                            }).finally(() => {
                                setTasksLoadingAtomValue(true);
                            });
                        }
                    },
                    {
                        label: "Reject",
                        onClick: (e, comment) => {
                            e.preventDefault()
                            executeUserTask(task.id, {
                                newTravelRequestInput: {
                                    managerApproved: false,
                                    approveComment: "",
                                    rejectComment: comment
                                }
                            }, true).then(response => {
                                if (response.status === 204) {
                                    toast.success("Travel has been rejected",
                                        {duration: 3000})
                                }
                            }).catch(e => {
                                toast.error("Error: " + e,
                                    {
                                        position: "top-right"
                                    }
                                )
                            }).finally(() => {
                                setTasksLoadingAtomValue(true);
                            });
                        }
                    },
                ]}/>
            )
        }
        {
            task.name === "CEO Review Travel" && (
                <TaskSubmitFooter task={task} buttons={[
                    {
                        label: "Approve",
                        onClick: (e, comment) => {
                            e.preventDefault()

                            executeUserTask(task.id, {
                                    newTravelRequestInput: {
                                        ceoApproved: true,
                                        ceoApproveComment: comment,
                                        ceoRejectComment: "",
                                    }
                                }, true
                            ).then(response => {
                                if (response.status === 204) {
                                    toast.success("Travel has been approved",
                                        {duration: 3000})
                                }
                            }).catch(e => {
                                toast.error("Error: " + e,
                                    {
                                        position: "top-right"
                                    }
                                )
                            }).finally(() => {
                                setTasksLoadingAtomValue(true);
                            });
                        }
                    },
                    {
                        label: "Reject",
                        onClick: (e, comment) => {
                            e.preventDefault()
                            executeUserTask(task.id, {
                                newTravelRequestInput: {
                                    ceoApproved: false,
                                    ceoApproveComment: "",
                                    ceoRejectComment: comment
                                }
                            }, true).then(response => {
                                if (response.status === 204) {
                                    toast.success("Travel has been rejected",
                                        {duration: 3000})
                                }
                            }).catch(e => {
                                toast.error("Error: " + e,
                                    {
                                        position: "top-right"
                                    }
                                )
                            }).finally(() => {
                                setTasksLoadingAtomValue(true);
                            });
                        }
                    },
                ]}/>
            )
        }
        {
            task.name === "Advance Payment" && (
                <TaskSubmitFooter task={task} isCommentRequired={false} buttons={[
                    {
                        label: "Save",
                        onClick: (e, comment) => {
                            e.preventDefault()
                            executeUserTask(task.id, {
                                    newTravelRequestInput: {
                                        advancedPayment: travelAdvancePayment,
                                    }
                                }, true
                            ).then(response => {
                                if (response.status === 204) {
                                    toast.success("Payment has been saved",
                                        {duration: 3000})
                                }
                            }).catch(e => {
                                toast.error("Error: " + e,
                                    {
                                        position: "top-right"
                                    }
                                )
                            }).finally(() => {
                                setTasksLoadingAtomValue(true);
                            });
                        }
                    },
                ]}>

                </TaskSubmitFooter>
            )
        }
    </>
}