'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import EmployeeFragment from "@/app/workspace/office/employee/employee-fragment";
import {useAtom} from "jotai/index";
import {selectedEmployee} from "@/app/workspace/office/employee/employee-selected-atom";
import {faker} from "@faker-js/faker";
import format from "date-fns/format";
import {useEffect} from "react";

let listItems: any = [
    {
        id: 1,
        username: "toikhoi",
        status: "Onboarded",
        isActive: true,
        phone: "0935198419",
    },
    {
        id: 2,
        username: "tiencho",
        status: "Onboarded",
        phone: "0123456789",
    },
    {
        id: 3,
        username: "doquyen",
        status: "Onboarded",
        phone: "9812784985",
    },
]

export default function EmployeePage() {
    const [selected, setSelected] = useAtom(selectedEmployee);

    useEffect(() => {
        setSelected(listItems[0]);
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
        username: "",
        status: "",
        phone: "",
    };

    return KeistarLayout(
        "Employee",
        <KeistarToolbar selected={selectedEmployee}
                        defaultValue={defaultSelected}
        />,
        <KeistarLeftSidebar
            idKey={"id"}
            titleKey={titleKey}
            selected={selectedEmployee}
            list={listItems}
            cardConfig={headerItem}
        />,
        <EmployeeFragment/>,
    );
}