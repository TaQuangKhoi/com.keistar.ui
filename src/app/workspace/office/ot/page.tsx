'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import OTFragment from "@/app/workspace/office/ot/ot-fragment";
import {useAtom} from "jotai/index";
import {selectedOT} from "@/app/workspace/office/ot/ot-selected-atom";
import {useEffect, useState} from "react";

const listItems: any = [
    {
        id: 1,
        code: "TT-VT-OT-0001109",
        "approver": "Vu Nguyen Quang Phap",
        "status": "OT waiting for approve",
        "from": "1/4/2024",
        "to": "1/4/2024",
        "total_hours": "8.00"
    },
    {
        id: 2,
        "approver": "Nguyen Thach Son",
        "status": "OT waiting for approve",
        "from": "2/4/2024",
        "to": "2/4/2024",
        "total_hours": "4.00"
    },
    {
        id: 3,
        "approver": "Vu Nguyen Quang Phap",
        "status": "OT waiting for approve",
        "from": "2/4/2024",
        "to": "3/4/2024",
        "total_hours": "16.00"
    },
    {
        id: 4,
        "approver": "Vu Nguyen Quang Phap",
        "status": "OT waiting for approve",
        "from": "5/4/2024",
        "to": "5/4/2024",
        "total_hours": "8.00"
    },
]

export default function OTPage() {
    const [selected, setSelected] = useAtom(selectedOT);
    const [otList, setOtList] = useState()

    useEffect(() => {
        setSelected(listItems[0])
    }, []);

    const headerItem = [
        {
            "label": "Approver",
            "key": "approver"
        },
        {
            "label": "Status",
            "key": "status"
        },
        {
            "label": "From",
            "key": "from"
        },
        {
            "label": "To",
            "key": "to"
        },
        {
            "label": "Total hours",
            "key": "total_hours"
        }
    ]

    return KeistarLayout(
        "OT Registration",
        <KeistarToolbar selected={selectedOT}/>,
        <KeistarLeftSidebar
            idKey={"id"}
            titleKey="approver"
            selected={selectedOT}
            list={listItems}
            cardConfig={headerItem}
        />,
        <OTFragment selected={selectedOT}/>,
    );
}