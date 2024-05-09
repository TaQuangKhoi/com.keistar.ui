'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import EmployeeFragment from "@/app/workspace/office/employee/employee-fragment";
import {useAtom} from "jotai/index";
import {selectedEmployeeAtom} from "@/app/workspace/office/employee/employee-selected-atom";
import {useEffect} from "react";
import {reloadEmployeesListAtom} from "@/app/workspace/office/employee/atoms/reload-employees-list-atom";
import {employeeListAtom} from "@/app/workspace/office/employee/atoms/employee-list-atom";

export default function EmployeePage() {
    const [selected, setSelected] = useAtom(selectedEmployeeAtom);
    const [list, setList] = useAtom(employeeListAtom);
    const [reloadList, setReloadList] = useAtom(reloadEmployeesListAtom);

    useEffect(() => {
        setReloadList(true);
    }, []);

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
        <KeistarToolbar selected={selectedEmployeeAtom}
                        defaultValue={defaultSelected}
                        reloadList={reloadEmployeesListAtom}
                        processConfig={{
                            processDeletedName: "Delete_Employee",
                            processCreateName: "Create_Employee",
                            processUpdateName: "Update_Employee",
                            businessDataType: "com.keistar.model.office.Employee",
                        }}
        />,
        <KeistarLeftSidebar list={employeeListAtom} reloadListAtom={reloadEmployeesListAtom}
                            idKey={"persistenceId_string"}
                            titleKey={titleKey}
                            selected={selectedEmployeeAtom}
                            cardConfig={{
                                businessDataType: "com.keistar.model.office.Employee",
                                header: headerItem
                            }}
        />,
        <EmployeeFragment employees={list || []}/>,
    );
}