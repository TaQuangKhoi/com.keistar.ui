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
import {useSession} from "@/bonita/api/system/get-the-current-user-session";
import {useEffect, useState} from "react";

export default function TravelPage() {
    const businessDataType = "com.keistar.model.office.travel.TravelRequest";
    const [session]: [Session, boolean, any] = useSession()
    const [username, setUsername] = useState('')

    useEffect(() => {
        console.debug(session.user_name)
        if (session.user_name) {
            setUsername(session.user_name)
        }
    }, [session]);

    return KeistarLayout(
        "Travel",
        <KeistarToolbar reloadListAtom={reloadTravelListAtom} selectedAtom={selectedTravelAtom}
                        defaultValue={defaultTravel}
                        processConfig={{
                            businessDataType,
                            businessData: {
                                params: {
                                    'username': username
                                },
                                query: "findsOrderByUpdatedDate",
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
                                    query: "findsOrderByUpdatedDate",
                                },
                                header: headerTravel,
                            }}
        />,
        <TravelFragment/>,
    );
}