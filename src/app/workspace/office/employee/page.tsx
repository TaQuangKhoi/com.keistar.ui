'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import EmployeeFragment from "@/app/workspace/office/employee/employee-fragment";
import {useAtom} from "jotai/index";
import {selectedEmployee} from "@/app/workspace/office/employee/employee-selected-atom";
import {faker} from "@faker-js/faker";
import format from "date-fns/format";
import {useEffect, useState} from "react";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";

let listItems: any = [
    {
        id: 1,
        username: "toikhoi",
        lastName: "Ta",
        firstName: "Khoi",
        status: "Onboarded",
        isActive: true,
        phone: "0935198419",
    },
    {
        id: 2,
        username: "tiencho",
        lastName: "Tran",
        firstName: "Tien",
        status: "Onboarded",
        phone: "0123456789",
    },
    {
        id: 3,
        username: "doquyen",
        lastName: "Do",
        firstName: "Quyen",
        status: "Onboarded",
        phone: "9812784985",
    },
]

export default function EmployeePage() {
    const [selected, setSelected] = useAtom(selectedEmployee);
    const [employees, setEmployees] = useState<Employee_Item[]>()

    useEffect(() => {
        setSelected(listItems[0]);
        const getEmployees = async () => {
            const employees = await findsBusinessData(
                "com.keistar.model.office.Employee", "find", 0, 20
            )
            setEmployees(employees);
        };
        getEmployees();
    }, []);

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
        id: undefined,
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
                        processName={"Create_Employee"}
                        config={null}
        />,
        <KeistarLeftSidebar
            idKey={"id"}
            titleKey={titleKey}
            selected={selectedEmployee}
            list={employees}
            cardConfig={headerItem}
        />,
        <EmployeeFragment/>,
    );
}