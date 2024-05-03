'use client'

import {selectedTravelAtom} from "@/app/workspace/office/travel/atoms/travel-selected-atom";
import {useAtom} from "jotai/index";
import {useEffect, useState} from "react";
import Travel_Item from "@/app/workspace/office/travel/types/travel-interface";
import {reloadTravelListAtom} from "@/app/workspace/office/travel/atoms/reload-travel-list-atom";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import {reloadEmployeesListAtom} from "@/app/workspace/office/employee/atoms/reload-employees-list-atom";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import defaultTravel from "@/app/workspace/office/travel/default-travel";
import TravelFragment from "@/app/workspace/office/travel/travel-fragment";
import headerTravel from "@/app/workspace/office/travel/header-travel";

export default function TravelPage() {
    const [selected, setSelected] = useAtom(selectedTravelAtom);
    const [list, setList] = useState<Travel_Item[]>()
    const [reloadList, setReloadList] = useAtom(reloadTravelListAtom);

    useEffect(() => {
        setReloadList(true);
    }, []);

    useEffect(() => {
        if (reloadList) {
            const getData = async () => {
                const employees = await findsBusinessData(
                    "com.keistar.model.office.travel.TravelRequest", "findsOrderByUpdatedDate", 0, 20, {}, 'directManager'
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

    const titleKey = "username";

    return KeistarLayout(
        "Travel",
        <KeistarToolbar selected={selectedTravelAtom}
                        defaultValue={defaultTravel}
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
            selected={selectedTravelAtom}
            list={list}
            cardConfig={headerTravel}
        />,
        <TravelFragment
            list={list || []}
        />,
    );
}