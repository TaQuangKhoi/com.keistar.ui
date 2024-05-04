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

export default function OTPage() {
    const [selected, setSelected] = useAtom(selectedOtAtom);
    const [list, setList] = useState<OT_Item[]>();
    const [reloadList, setReloadList] = useAtom(reloadOtListAtom);

    useEffect(() => {
        setReloadList(true);
    }, []);

    useEffect(() => {
        if (reloadList) {
            const getData = async () => {
                const employees = await findsBusinessData(
                    "com.keistar.model.office.OT", "findsOrderByUpdatedDate", 0, 20, {}, 'directManager'
                )
                setList(employees);
            };
            getData();
            setReloadList(false);
        }
    }, [reloadList]);

    /**
     * Default selected employee
     */
    useEffect(() => {
        if (list) {
            setSelected(list[0]);
        }
    }, [list]);

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
            "key": "startDate"
        },
        {
            "label": "End Date",
            "key": "endDate"
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
                        reloadList={reloadOtListAtom}
                        processConfig={{
                            processDeletedName: "Delete_OT",
                            processCreateName: "Create_OT",
                            processUpdateName: "Update_OT",
                            businessDataType: "com.keistar.model.office.OT",
                        }}
        />,
        <KeistarLeftSidebar
            idKey={"persistenceId_string"}
            titleKey="persistenceId_string"
            selected={selectedOtAtom}
            list={list}
            cardConfig= {{
                header: headerItem

            }}
        />,
        <OTFragment/>,
    );
}