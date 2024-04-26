'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import EmployeeFragment from "@/app/workspace/office/employee/employee-fragment";
import {useAtom, useAtomValue} from "jotai/index";
import {selectedEmployee} from "@/app/workspace/office/employee/employee-selected-atom";
import {useEffect, useState} from "react";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";
import {reloadEmployeesListAtom} from "@/app/workspace/office/employee/atoms/reload-employees-list-atom";


export default function EmployeePage() {
    const [selected, setSelected] = useAtom(selectedEmployee);
    const [employees, setEmployees] = useState<Employee_Item[]>()
    const [reloadEmployeesList, setReloadEmployeesList] = useAtom(reloadEmployeesListAtom);

    useEffect(() => {
        if (reloadEmployeesList) {
            const getEmployees = async () => {
                const employees = await findsBusinessData(
                    "com.keistar.model.office.Employee", "find", 0, 20
                )
                setEmployees(employees);
            };
            getEmployees();
            setReloadEmployeesList(false);
        }
    }, [reloadEmployeesList]);

    useEffect(() => {
        if (employees) {
            setSelected(employees[0]);
        }
    }, [employees]);

    const titleKey = "username";
    const headerItem = [
        {
            "label": "Username",
            "key": "username"
        },
        {
            "label": "Status",
            "key": "status"
        },
    ]
    const defaultSelected = {
        persistenceId: undefined,
        phone: "",
        username: "",
        firstName: "",
        lastName: "",
        engine_id: "",
        status: "",
        email: "",
        workplaceId: "",
        positionName: "",
        contractTypeId: "",
        workTypeId: "",
        probationStartDate: "",
        probationEndDate: "",
        hrManagerAcceptance: "",
        hrManagerComment: "",
        directManagerComment: "",
        isActive: "",
        employeeTypeId: "",
        directManagerId: "",
        createdBy: "",
        createdDate: "",
        dateOfBirth: ""
    };

    return KeistarLayout(
        "Employee",
        <KeistarToolbar selected={selectedEmployee}
                        defaultValue={defaultSelected}
                        processCreateName={"Create_Employee"}
                        processUpdateName={"Update_Employee"}
                        config={
                            {
                                businessDataType: "com.keistar.model.office.Employee",
                            }
                        }
                        reloadList={reloadEmployeesListAtom}
        />,
        <KeistarLeftSidebar
            idKey={"persistenceId_string"}
            titleKey={titleKey}
            selected={selectedEmployee}
            list={employees}
            cardConfig={headerItem}
        />,
        <EmployeeFragment/>,
    );
}