'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import EmployeeFragment from "@/app/workspace/office/employee/employee-fragment";
import {useAtom} from "jotai/index";
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
        setReloadEmployeesList(true);
    }, []);

    useEffect(() => {
        if (reloadEmployeesList) {
            const getEmployees = async () => {
                const employees = await findsBusinessData(
                    "com.keistar.model.office.Employee", "findsOrderByUpdatedDate", 0, 20, {}, 'directManager'
                )
                setEmployees(employees);
            };
            getEmployees();
            setReloadEmployeesList(false);
        }
    }, [reloadEmployeesList]);

    /**
     * Default selected employee
     */
    useEffect(() => {
        if (employees) {
            setSelected(employees[0]);
        }
    }, [employees]);

    const titleKey = "username";
    const headerItem = [
        {
            "label": "Status",
            "key": "status"
        },
        {
            "label": "Phone",
            "key": "phone"
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
        directManager_persistenceId: "",
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
                        processConfig={{
                            processDeletedName: "Delete_Employee",
                            processCreateName: "Create_Employee",
                            processUpdateName: "Update_Employee",
                        }}
        />,
        <KeistarLeftSidebar
            idKey={"persistenceId_string"}
            titleKey={titleKey}
            selected={selectedEmployee}
            list={employees}
            cardConfig={headerItem}
        />,
        <EmployeeFragment
            employees={employees || []}
        />,
    );
}