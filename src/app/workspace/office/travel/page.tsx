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
    const businessDataType = "com.keistar.model.office.travel.TravelRequest";

    return KeistarLayout(
        "Travel",
        <KeistarToolbar reloadListAtom={reloadTravelListAtom} selected={selectedTravelAtom}
                        defaultValue={defaultTravel}
                        processConfig={{
                            businessDataType,
                            processDeletedName: "Delete_Travel",
                            processCreateName: "Create_TravelRequest",
                            processUpdateName: "Update_Travel",
                        }}
        />,
        <KeistarLeftSidebar listAtom={travelListAtom} reloadListAtom={reloadTravelListAtom}
                            idKey={"persistenceId_string"}
                            titleKey={"persistenceId"}
                            selected={selectedTravelAtom}
                            cardConfig={{
                                businessDataType,
                                header: headerTravel,
                            }}
        />,
        <TravelFragment/>,
    );
}