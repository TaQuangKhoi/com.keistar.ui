import {executeUserTask} from "@/bonita/api/bpm/user-task/definitions/execute-the-user-task";
import {toast} from "sonner";
import TaskSubmitFooter from "@/app/workspace/tasks/components/task-submit-footer";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import {useAtom} from "jotai/index";
import {tasksLoadingAtom} from "@/app/workspace/tasks/atoms/tasks-loading-atom";

export default function ReviewCandidateForR1FormFooter({task}: { task: FullHumanTask }) {
    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);


    return <TaskSubmitFooter isCommentRequired={true} task={task} buttons={[
        {
            label: "Approve",
            onClick: (e, comment) => {
                e.preventDefault()

                executeUserTask(task.id, {directManagerComment: comment, isPassed: true,}, true
                ).then(response => {
                    if (response.status === 204) {
                        toast.success("Review has been approved", {duration: 3000})
                    }
                }).catch(e => {
                    toast.error("Error: " + e, {position: "top-right"})
                }).finally(() => {
                    setTasksLoadingAtomValue(true);
                });
            }
        },
        {
            label: "Reject",
            onClick: (e, comment) => {
                e.preventDefault()
                executeUserTask(task.id, {directManagerComment: comment, isPassed: false,}, true).then(response => {
                    if (response.status === 204) {
                        toast.success("Review has been rejected",
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
}