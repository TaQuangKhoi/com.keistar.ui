import {atom} from 'jotai'
import { atomWithImmer } from 'jotai-immer'
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";

export const selectedEmployee = atomWithImmer<Employee_Item>({
    persistenceId: 0,
})