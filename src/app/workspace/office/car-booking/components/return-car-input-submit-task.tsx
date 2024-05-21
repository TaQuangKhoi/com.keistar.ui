import {Label} from "@/components/ui/label";
import KeistarDateTimePicker from "@/app/components/keistar-date-time-picker";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {selectedCarBookingAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-selected-atom";

export default function ReturnCarInputSubmitTask() {
    const [date, setDate] = useState<Date | undefined>()
    useEffect(() => {
        setSelectedItem((draft) => {
            draft.returnedDate = date?.toISOString()
        })
    }, [date]);


    const [selectedItem, setSelectedItem] = useAtom(selectedCarBookingAtom);


    return <>
        <Label htmlFor="startDateEndDate">Return Date</Label>
        <KeistarDateTimePicker date={date} setDate={setDate} hasTime={true}/>
        <Label htmlFor="startDateEndDate">Before KM</Label>
        <Input type="number" className="input" placeholder="Enter KM"
               value={selectedItem.afterKm}
               onChange={(e) => setSelectedItem((draft) => {
                   draft.afterKm = Number(e.target.value)
               })}
        />
    </>
}