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
import defaultOT from "@/app/workspace/office/ot/config/default-selected-ot";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import {otListAtom} from "@/app/workspace/office/ot/atoms/ot-list-atom";
import headerOT from "@/app/workspace/office/ot/config/header-ot";

export default function OTPage() {
    const businessDataType = "com.keistar.model.office.OT";

    return KeistarLayout(
        "OT Registration",
        <KeistarToolbar selectedAtom={selectedOtAtom}
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
                            selectedAtom={selectedOtAtom}
                            cardConfig={{
                                businessDataType,
                                header: headerOT,
                            }}
        />,
        <OTFragment/>,
    );
}