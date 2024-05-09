'use client'

import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import format from "date-fns/format";
import {Separator} from "@/components/ui/separator";
import {
    useGetContextByUserTaskId,
} from "@/bonita/api/bpm/user-task/definitions/finds-context-by-user-task-id";
import {useEffect, useState} from "react";
import {default as axios, useBaseUrl} from "@/lib/axios-instance";
import E_leave from "@/app/workspace/office/e-leave/e_leave_type";
import {useUserById} from "@/bonita/api/identity/user/definitions/finds-the-user-by-id";
import {executeUserTask} from "@/bonita/api/bpm/user-task/definitions/execute-the-user-task";
import {toast} from "sonner";
import {useAtom} from "jotai";
import {tasksLoadingAtom} from "@/app/workspace/tasks/atoms/tasks-loading-atom";
import ProcessFormInput from "@/app/workspace/tasks/components/process-form-input";

export default function ReviewEleaveForm({task}: { task: FullHumanTask }) {
    const [context, ,] = useGetContextByUserTaskId(task.id);
    const [e_leave, setE_leave] = useState<E_leave>({})
    const [userById, ,] = useUserById(e_leave.requestor)
    const [baseUrl, , setBaseUrl] = useBaseUrl("");

    const [comment, setComment] = useState<string>();

    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);


    /**
     * Display the e-leave in the form by input tags
     */
    const [e_leaveDisplay, setE_leaveDisplay] = useState<any>([])

    /**
     * Get the context of the task, then get the e-leave from the context
     */
    useEffect(() => {
        if (context) {
            setBaseUrl('/' + context.eleave_ref.link)
            if (baseUrl !== undefined) {
                axios.get(baseUrl, {
                    withCredentials: true,
                }).then((response) => {
                    setE_leave(response.data)
                });
            }
        }
    }, [task, context, baseUrl]);

    useEffect(() => {
        setE_leaveDisplay([
            {
                key: "Requester",
                value: userById?.firstname + " " + userById?.lastname,
            },
            {
                key: "From Date",
                value: e_leave.startDate ? format(new Date(e_leave?.startDate), "dd/MM/yyyy") : "",
            },
            {
                key: "To Date",
                value: e_leave.endDate ? format(new Date(e_leave?.endDate), "dd/MM/yyyy") : "",
            },
            {
                key: "Total Days",
                value: e_leave.totalDays,
            },
            {
                key: "Date Status",
                value: e_leave.leaveTime,
            },
            {
                key: "Leave Type",
                value: e_leave.leaveType?.name,
            },
            {
                key: "Leave Reason",
                value: e_leave.reason,
                type: "textarea",
            },
        ])
    }, [userById, e_leave]);

    return <>
        <ProcessFormInput data={e_leaveDisplay}/>

        <Separator className="mt-auto"/>
        <div className="p-4">
            <form>
                <div className="grid gap-4">
                    <Textarea
                        className="p-4"
                        placeholder={`Comment for ${task.name}...`}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex items-center">
                        <Label
                            htmlFor="mute"
                            className="flex items-center gap-2 text-xs font-normal"
                        >
                            <Switch id="mute" aria-label="Mute thread"/> Mute this
                            thread
                        </Label>
                        <div className="flex ml-auto space-x-2">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    executeUserTask(task.id, {
                                        newEleaveInput: {
                                            isApprove: false,
                                            isReject: true,
                                            approveComment: "",
                                            rejectComment: comment
                                        }
                                    }).then(response => {
                                        if (response.status === 204) {
                                            toast.success("E-leave has been rejected",
                                                {duration: 3000})
                                        }
                                    }).catch(e => {
                                        toast.error("Error: " + e)
                                    }).finally(() => {
                                        setTasksLoadingAtomValue(true);
                                    });
                                }}
                                size="sm"
                            >
                                Reject
                            </Button>

                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    executeUserTask(task.id, {
                                        newEleaveInput: {
                                            isApprove: true,
                                            isReject: false,
                                            approveComment: comment,
                                            rejectComment: ""
                                        }
                                    }).then(response => {
                                        if (response.status === 204) {
                                            toast.success("E-leave has been approved",
                                                {duration: 3000})
                                        }
                                    }).catch(e => {
                                        toast.error("Error: " + e)
                                    }).finally(() => {
                                        setTasksLoadingAtomValue(true);
                                    });
                                }}
                                size="sm"
                                className=""
                            >
                                Approve
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
}