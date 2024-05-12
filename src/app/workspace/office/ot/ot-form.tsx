import ProcessFormShell from "@/app/workspace/tasks/components/process-form-shell";
import {Separator} from "@/components/ui/separator";
import OTFragment from "@/app/workspace/office/ot/ot-fragment";
import useFormItem from "@/app/workspace/hooks/use-form-item";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import {selectedOtAtom} from "@/app/workspace/office/ot/atoms/ot-selected-atom";
import TaskSubmitFooter from "@/app/workspace/tasks/components/task-submit-footer";
import {useAtom} from "jotai/index";
import {tasksLoadingAtom} from "@/app/workspace/tasks/atoms/tasks-loading-atom";
import SubmitReviewOt from "@/app/workspace/office/ot/functions/submit-review-ot";

export default function OtForm({task}: { task: FullHumanTask }) {
    useFormItem({
        taskId: task.id,
        selectedItemAtom: selectedOtAtom,
        refName: "newOT_ref",
    })
    const [, setTasksLoadingAtomValue] = useAtom(tasksLoadingAtom);

    return <>
        <ProcessFormShell>
            <OTFragment isInForm={true}/>
        </ProcessFormShell>
        <Separator className="mt-auto"/>
        <TaskSubmitFooter task={task} buttons={[
            {
                label: "Approve",
                onClick: async (e, comment) => {
                    e.preventDefault()
                    SubmitReviewOt(task.id, comment, true);
                    setTasksLoadingAtomValue(true);
                }
            },
            {
                label: "Reject",
                onClick: (e, comment) => {
                    e.preventDefault()
                    SubmitReviewOt(task.id, comment, false);
                    setTasksLoadingAtomValue(true);
                }
            },
        ]}/>
    </>
}