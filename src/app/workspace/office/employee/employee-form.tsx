import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import ProcessFormShell from "@/app/workspace/tasks/components/process-form-shell";
import {Separator} from "@/components/ui/separator";
import EmployeeFragment from "@/app/workspace/office/employee/employee-fragment";
import {useAtom} from "jotai/index";
import {tasksLoadingAtom} from "@/app/workspace/tasks/atoms/tasks-loading-atom";
import useFormItem from "@/app/workspace/hooks/use-form-item";
import {selectedEmployeeAtom} from "@/app/workspace/office/employee/atoms/employee-selected-atom";
import TaskSubmitFooter from "@/app/workspace/tasks/components/task-submit-footer";
import {executeUserTask} from "@/bonita/api/bpm/user-task/definitions/execute-the-user-task";
import {toast} from "sonner";

export default function EmployeeForm({task}: { task: FullHumanTask }) {
    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);

    useFormItem({
        taskId: task.id,
        selectedItemAtom: selectedEmployeeAtom,
        refName: "newEmployee_ref",
    })

    return <>
        <ProcessFormShell>
            <EmployeeFragment isInForm={true} task={task}/>
        </ProcessFormShell>
        <Separator className="mt-auto"/>
        {
            task.name === "Review CV's" && (
                <TaskSubmitFooter isCommentRequired={false} task={task} buttons={[
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
                                    toast.success("CV has been approved",
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
                                    toast.success("CV has been rejected",
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
    </>
}