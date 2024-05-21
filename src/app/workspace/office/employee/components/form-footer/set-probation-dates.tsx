import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import {executeUserTask} from "@/bonita/api/bpm/user-task/definitions/execute-the-user-task";
import {toast} from "sonner";
import TaskSubmitFooter from "@/app/workspace/tasks/components/task-submit-footer";
import {useImmerAtom} from "jotai-immer";
import {selectedEmployeeAtom} from "@/app/workspace/office/employee/atoms/employee-selected-atom";
import {useAtom} from "jotai/index";
import {tasksLoadingAtom} from "@/app/workspace/tasks/atoms/tasks-loading-atom";
import SetAppointmentR2SubmitTask
    from "@/app/workspace/office/employee/components/form-footer/set-appointment-r2-submit-task";
import SetProbationDatesSubmitTask
    from "@/app/workspace/office/employee/components/form-footer/set-probation-dates-submit-task";

export default function SetProbationDates({task}: { task: FullHumanTask }) {
    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);
    const [selectedItem,] = useImmerAtom(selectedEmployeeAtom);

    return <TaskSubmitFooter task={task} isCommentRequired={false} buttons={[
        {
            label: "Save",
            onClick: (e,) => {
                e.preventDefault()
                executeUserTask(task.id, {
                        probationStartDate: selectedItem.probationStartDate,
                        probationEndDate: selectedItem.probationEndDate,
                    }, true
                ).then(response => {
                    if (response.status === 204) {
                        toast.success("Probation dates have been set",
                            {duration: 3000})
                    }
                }).catch(e => {
                    toast.error("Error: " + e,
                        {position: "top-right"}
                    )
                }).finally(() => {
                    setTasksLoadingAtomValue(true);
                });
            }
        },
    ]}>
        <SetProbationDatesSubmitTask/>
    </TaskSubmitFooter>
}