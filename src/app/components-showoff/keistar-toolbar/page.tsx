'use client';

import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import {selectedCarBookingAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-selected-atom";
import {carBookingListAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-list-atom";
import {reloadCarBookingListAtom} from "@/app/workspace/office/car-booking/atoms/reload-car-booking-list-atom";
import defaultCarBooking from "@/app/workspace/office/car-booking/config/default-car-booking";

export default function KeistarToolbarComponentShowoffPage() {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
        <KeistarToolbar listAtom={carBookingListAtom}
                        reloadListAtom={reloadCarBookingListAtom}
                        selectedAtom={selectedCarBookingAtom}

                        defaultValue={defaultCarBooking}
                        processConfig={{
                            businessDataType: "",
                            businessData: {
                                params: {
                                    'username': ""
                                },
                                query: "findsOrderByUpdatedDateOfUser",
                            },
                            processDeletedName: "Delete_Car_Booking",
                            processCreateName: "Create_Car_Booking",
                            processUpdateName: "Update_Car_Booking",
                        }}
        />
    </div>
}