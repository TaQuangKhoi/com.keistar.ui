import {atom} from "jotai";
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";

export const employeeListAtom = atom<Employee_Item[]>([])