'use client'

import {selectedTravelAtom} from "@/app/workspace/office/travel/atoms/travel-selected-atom";
import {reloadTravelListAtom} from "@/app/workspace/office/travel/atoms/reload-travel-list-atom";
import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import defaultTravel from "@/app/workspace/office/travel/config/default-travel";
import TravelFragment from "@/app/workspace/office/travel/travel-fragment";
import headerTravel from "@/app/workspace/office/travel/config/header-travel";
import {travelListAtom} from "@/app/workspace/office/travel/atoms/travel-list-atom";
import {useEffect, useState} from "react";
import {useUsername} from "@/app/workspace/hooks/use-username";


export default function TravelPage() {
    const businessDataType = "com.keistar.model.office.travel.TravelRequest";

    const [username] = useUsername();

    useEffect(() => {
        console.debug('TravelPage', username)
    }, [username]);

    return <>
        {
            username && KeistarLayout(
                "Travel",
                <KeistarToolbar reloadListAtom={reloadTravelListAtom} selectedAtom={selectedTravelAtom}
                                defaultValue={defaultTravel}
                                processConfig={{
                                    businessDataType,
                                    businessData: {
                                        params: {
                                            'username': username
                                        },
                                        query: "findsOrderByUpdatedDateOfUser",
                                    },
                                    processDeletedName: "Delete_Travel",
                                    processCreateName: "Create_TravelRequest",
                                    processUpdateName: "Update_Travel",
                                }}
                                listAtom={travelListAtom}
                />,
                <KeistarLeftSidebar listAtom={travelListAtom} reloadListAtom={reloadTravelListAtom}
                                    idKey={"persistenceId_string"}
                                    titleKey={"persistenceId"}
                                    selectedAtom={selectedTravelAtom}
                                    cardConfig={{
                                        businessDataType,
                                        businessData: {
                                            params: {
                                                'username': username
                                            },
                                            query: "findsOrderByUpdatedDateOfUser", //
                                        },
                                        header: headerTravel,
                                    }}
                />,
                <TravelFragment/>,
            )
        }
    </>;
}