import {KeistarTaskDefinition} from "@/app/workspace/tasks/process-definitions/keistar-task-definition-interface";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import EmployeeForm from "@/app/workspace/office/employee/employee-form";

export const employeeProcessTaskDefinitions: KeistarTaskDefinition[] = [
    {
        taskName: "Review CV's",
        component: (task: FullHumanTask) => <EmployeeForm task={task}/>,
    },
    {
        taskName: "Set Appointment R1",
        component: (task: FullHumanTask) => <EmployeeForm task={task}/>,
    },
    {
        taskName: "Review Candidate for R1",
        component: (task: FullHumanTask) => <EmployeeForm task={task}/>,
    },
];