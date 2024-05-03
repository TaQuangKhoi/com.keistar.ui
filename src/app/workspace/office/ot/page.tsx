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
        <KeistarToolbar selected={selectedOtAtom}
                        defaultValue={defaultOT}
                        reloadList={reloadOtListAtom}
                        processConfig={{
                            processDeletedName: "Delete_Employee",
                            processCreateName: "Create_Employee",
                            processUpdateName: "Update_Employee",
                            businessDataType: "com.keistar.model.office.Employee",
                        }}
        />,
        <KeistarLeftSidebar
            idKey={"id"}
            titleKey="approver"
            selected={selectedOtAtom}
            list={list}
            cardConfig={headerItem}
        />,
        <OTFragment selected={selectedOtAtom}/>,
    );
}