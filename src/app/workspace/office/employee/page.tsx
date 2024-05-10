'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import EmployeeFragment from "@/app/workspace/office/employee/employee-fragment";
import {selectedEmployeeAtom} from "@/app/workspace/office/employee/atoms/employee-selected-atom";
import {reloadEmployeesListAtom} from "@/app/workspace/office/employee/atoms/reload-employees-list-atom";
import {employeeListAtom} from "@/app/workspace/office/employee/atoms/employee-list-atom";
import headerEmployee from "@/app/workspace/office/employee/config/header-employee";
import defaultEmployee from "@/app/workspace/office/employee/config/default-employee";

export default function EmployeePage() {
    return KeistarLayout(
        "Employee",
        <KeistarToolbar selectedAtom={selectedEmployeeAtom}
                        defaultValue={defaultEmployee}
                        reloadListAtom={reloadEmployeesListAtom}
                        processConfig={{
                            processDeletedName: "Delete_Employee",
                            processCreateName: "Create_Employee",
                            processUpdateName: "Update_Employee",
                            businessDataType: "com.keistar.model.office.Employee",
                        }}
                        listAtom={employeeListAtom}
        />,
        <KeistarLeftSidebar listAtom={employeeListAtom} reloadListAtom={reloadEmployeesListAtom}
                            idKey={"persistenceId_string"}
                            titleKey={"username"}
                            selectedAtom={selectedEmployeeAtom}
                            cardConfig={{
                                businessDataType: "com.keistar.model.office.Employee",
                                header: headerEmployee,
                            }}
        />,
        <EmployeeFragment/>,
    );
}