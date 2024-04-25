'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import EmployeeFragment from "@/app/workspace/office/employee/employee-fragment";
import {useAtom} from "jotai/index";
import {selectedEmployee} from "@/app/workspace/office/employee/employee-selected-atom";

const listItems: any = [
    {
        ID: 1,
        username: "taquangkhoi",
        status: "Onboarded",
        isActive: true,
    },
    {
        ID: 2,
        username: "vuhoanglamnhi",
        status: "Onboarded",

    },
    {
        ID: 3,
        username: "trannguyenminhthuan",
        status: "Onboarded",
    },
    {
        ID: 4,
        username: "nguyenquangphapvu",
        status: "Onboarded",
    },
]

export default function EmployeePage() {
    const [selected, setSelected] = useAtom(selectedEmployee);

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

    return KeistarLayout(
        "Employee",
        <KeistarToolbar selected={selectedEmployee}/>,
        <KeistarLeftSidebar
            idKey={"ID"}
            titleKey={titleKey}
            selected={selectedEmployee}
            list={listItems}
            cardConfig={headerItem}
        />,
        <EmployeeFragment selected={selectedEmployee}/>,
    );
}