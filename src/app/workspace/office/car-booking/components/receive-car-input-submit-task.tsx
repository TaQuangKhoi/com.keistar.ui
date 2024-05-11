import {Label} from "@/components/ui/label";
import KeistarDateTimePicker from "@/app/components/keistar-date-time-picker";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {selectedCarBookingAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-selected-atom";

export default function ReceiveCarInputSubmitTask() {
    const [date, setDate] = useState<Date | undefined>()
    useEffect(() => {
        setSelectedItem((draft) => {
            draft.receivedDate = date?.toISOString()
        })
    }, [date]);


    const [selectedItem, setSelectedItem] = useAtom(selectedCarBookingAtom);


    return <>
        <Label htmlFor="startDateEndDate">Receive Date</Label>
        <KeistarDateTimePicker
            date={date}
            setDate={setDate}
            hasTime={true}/>
        <Label htmlFor="startDateEndDate">Before KM</Label>
        <Input type="number" className="input" placeholder="Enter KM"
               value={selectedItem.beforeKm}
               onChange={(e) => setSelectedItem((draft) => {
                   draft.beforeKm = Number(e.target.value)
               })}
        />
    </>
}