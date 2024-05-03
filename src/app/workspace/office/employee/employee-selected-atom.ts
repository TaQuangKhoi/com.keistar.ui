import { atomWithImmer } from 'jotai-immer';
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";

export const selectedEmployeeAtom = atomWithImmer<Employee_Item>({
    persistenceId: 0,
    directManager_persistenceId: "0",
})