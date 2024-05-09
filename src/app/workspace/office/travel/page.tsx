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
import {travelListAtom} from "@/app/workspace/office/travel/atoms/travel-list-atom";

export default function TravelPage() {
    const [selected, setSelected] = useAtom(selectedTravelAtom);
    const [list, setList] = useState<Travel_Item[]>()
    const [reloadList, setReloadList] = useAtom(reloadTravelListAtom);

    useEffect(() => {
        setReloadList(true);
    }, []);

    const titleKey = "persistenceId";
    const businessDataType = "com.keistar.model.office.travel.TravelRequest";

    return KeistarLayout(
        "Travel",
        <KeistarToolbar selected={selectedTravelAtom}
                        defaultValue={defaultTravel}
                        reloadListAtom={reloadTravelListAtom}
                        processConfig={{
                            businessDataType,
                            processDeletedName: "Delete_Travel",
                            processCreateName: "Create_TravelRequest",
                            processUpdateName: "Update_Travel",
                        }}
        />,
        <KeistarLeftSidebar listAtom={travelListAtom} reloadListAtom={reloadTravelListAtom}
                            idKey={"persistenceId_string"}
                            titleKey={titleKey}
                            selected={selectedTravelAtom}
                            cardConfig={{
                                businessDataType,
                                header: headerTravel,
                            }}
        />,
        <TravelFragment/>,
    );
}