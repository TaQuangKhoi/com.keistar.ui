'use client'

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import OTFragment from "@/app/workspace/office/ot/ot-fragment";
import {useAtom} from "jotai/index";
import {selectedOtAtom} from "@/app/workspace/office/ot/atoms/ot-selected-atom";
import {useEffect, useState} from "react";
import {reloadOtListAtom} from "@/app/workspace/office/ot/atoms/reload-ot-list-atom";
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";
import defaultOT from "@/app/workspace/office/ot/default-selected-ot";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import {otListAtom} from "@/app/workspace/office/ot/atoms/ot-list-atom";

export default function OTPage() {
    const businessDataType = "com.keistar.model.office.OT";

    const headerItem = [
        {
            "label": "Approver",
            "key": "approver.firstName"
        },
        {
            "label": "Status",
            "key": "status"
        },
        {
            "label": "Start Date",
            "key": "startDate(Date)"
        },
        {
            "label": "End Date",
            "key": "endDate(Date)"
        },
        {
            "label": "Total hours",
            "key": "totalHour"
        }
    ]

    return KeistarLayout(
        "OT Registration",
        <KeistarToolbar selected={selectedOtAtom}
                        defaultValue={defaultOT}
                        reloadListAtom={reloadOtListAtom}
                        processConfig={{
                            processDeletedName: "Delete_OT",
                            processCreateName: "Create_OT",
                            processUpdateName: "Update_OT",
                            businessDataType,
                        }}
        />,
        <KeistarLeftSidebar listAtom={otListAtom} reloadListAtom={reloadOtListAtom}
                            idKey={"persistenceId_string"}
                            titleKey="persistenceId_string"
                            selected={selectedOtAtom}
                            cardConfig={{
                                businessDataType,
                                header: headerItem
                            }}
        />,
        <OTFragment/>,
    );
}