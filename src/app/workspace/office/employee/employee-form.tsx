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
import SetAppointmentR1SubmitTask from "@/app/workspace/office/employee/components/set-appointment-r1-submit-task";
import {useImmerAtom} from "jotai-immer";
import ReviewCandidateForR1FormFooter
    from "@/app/workspace/office/employee/components/review-candidate-for-r1-form-footer";
import SetAppointmentR2 from "@/app/workspace/office/employee/components/form-footer/set-appointment-r2";
import ReviewCandidateForR2FormFooter
    from "@/app/workspace/office/employee/components/form-footer/review-candidate-for-r2";
import CandidateFeedback from "@/app/workspace/office/employee/components/form-footer/candidate-feedback";
import SetProbationDates from "@/app/workspace/office/employee/components/form-footer/set-probation-dates";

export default function EmployeeForm({task}: { task: FullHumanTask }) {
    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);

    useFormItem({
        taskId: task.id,
        selectedItemAtom: selectedEmployeeAtom,
        refName: "newEmployee_ref",
    })

    const [selectedItem,] = useImmerAtom(selectedEmployeeAtom);

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

                            executeUserTask(task.id, {isApproveCV: true,}, true
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
                            executeUserTask(task.id, {isApproveCV: false,}, true).then(response => {
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
        {
            task.name === "Set Appointment R1" && (
                <TaskSubmitFooter task={task} isCommentRequired={false} buttons={[
                    {
                        label: "Save",
                        onClick: (e, comment) => {
                            e.preventDefault()
                            executeUserTask(task.id, {
                                    r1Date: selectedItem.r1Date,
                                }, true
                            ).then(response => {
                                if (response.status === 204) {
                                    toast.success("Appointment has been saved",
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
                    <SetAppointmentR1SubmitTask/>
                </TaskSubmitFooter>
            )
        }
        {
            task.name === "Review Candidate for R1" && (
                <ReviewCandidateForR1FormFooter task={task}/>
            )
        }
        {
            task.name === "Set Appointment R2" && (
                <SetAppointmentR2 task={task}/>
            )
        }
        {
            task.name === "Review Candidate for R2" && (
                <ReviewCandidateForR2FormFooter task={task}/>
            )
        }
        {
            task.name === "Candidate Feedback" && (
                <CandidateFeedback task={task}/>
            )
        }
        {
            task.name === "Set Probation Dates" && (
                <SetProbationDates task={task}/>
            )
        }
    </>
}