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
import ProcessFormInput, {ProcessFormInputType} from "@/app/workspace/tasks/components/process-form-input";

export default function TravelForm({task}: { task: FullHumanTask }) {
    const [context, ,] = useGetContextByUserTaskId(task.id);
    const [travelRequest, setTravelRequest] = useState<Travel_Item>()

    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);

    const getData = async () => {
        const data = await callLink(context.newTravelRequest_ref.link)
        setTravelRequest(data)
    }

    useEffect(() => {
        if (context != undefined) {
            getData()
        }
    }, [context]);

    let data: ProcessFormInputType[] = [
        {
            key: "Start Date",
            value: travelRequest?.startDate,
        },
        {
            key: "End Date",
            value: travelRequest?.endDate,
        },
        {
            key: "Total Days",
            value: travelRequest?.totalDays,
        },
        {
            key: "Country",
            value: travelRequest?.country?.name,
        },
        {
            key: "Location",
            value: travelRequest?.location,
        },

    ]

    return <>
        <ProcessFormInput data={data}/>
        <Separator className="mt-auto"/>
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
    </>
}