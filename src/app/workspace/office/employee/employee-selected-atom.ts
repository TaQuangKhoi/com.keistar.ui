import {atom} from 'jotai'
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";

export const selectedEmployee = atom<Employee_Item>({
    ID: 0,
})