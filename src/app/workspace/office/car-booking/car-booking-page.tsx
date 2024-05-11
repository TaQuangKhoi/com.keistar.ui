'use client';

import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import CarBookingFragment from "@/app/workspace/office/car-booking/car-booking-fragment";

import {reloadCarBookingListAtom} from "@/app/workspace/office/car-booking/atoms/reload-car-booking-list-atom";
import {carBookingListAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-list-atom";
import {selectedCarBookingAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-selected-atom";

import defaultCarBooking from "@/app/workspace/office/car-booking/config/default-car-booking";
import headerCarBooking from "@/app/workspace/office/car-booking/config/header-car-booking";
import {useUsername} from "@/app/workspace/hooks/use-username";

export default function CarBookingPage() {
    const businessDataType = "com.keistar.model.office.CarBooking";

    const [username] = useUsername();

    return <>
        {
            username && KeistarLayout(
                "Car Booking",
                <KeistarToolbar listAtom={carBookingListAtom}
                                reloadListAtom={reloadCarBookingListAtom}
                                selectedAtom={selectedCarBookingAtom}

                                defaultValue={defaultCarBooking}
                                processConfig={{
                                    businessDataType,
                                    businessData: {
                                        params: {
                                            'username': username
                                        },
                                        query: "findsOrderByUpdatedDateOfUser",
                                    },
                                    processDeletedName: "Delete_Car_Booking",
                                    processCreateName: "Create_Car_Booking",
                                    processUpdateName: "Update_Car_Booking",
                                }}
                />,
                <KeistarLeftSidebar listAtom={carBookingListAtom}
                                    reloadListAtom={reloadCarBookingListAtom}
                                    selectedAtom={selectedCarBookingAtom}

                                    idKey={"persistenceId_string"}
                                    titleKey={"persistenceId"}
                                    cardConfig={{
                                        businessDataType,
                                        businessData: {
                                            params: {
                                                'username': username
                                            },
                                            query: "findsOrderByUpdatedDateOfUser", //
                                        },
                                        header: headerCarBooking,
                                    }}
                />,
                <CarBookingFragment/>,
            )
        }
    </>;
}