import KeistarDateTimePicker from "@/app/components/keistar-date-time-picker";
import {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {selectedEmployeeAtom} from "@/app/workspace/office/employee/atoms/employee-selected-atom";

export default function SetAppointmentR2SubmitTask() {
    const [date, setDate] = useState<Date>()
    const [dateString, setDateString] = useState<string | Date>('')
    const [selectedItem, setSelectedItem] = useAtom(selectedEmployeeAtom);
    useEffect(() => {
        setSelectedItem((draft) => {
            draft.r2Date = dateString as string;
        })
    }, [dateString]);


    useEffect(() => {
        if (selectedItem.r2Date) {
            setDate(new Date(selectedItem.r2Date))
        } else {
            setDate(null as any)
        }
    }, [selectedItem.persistenceId_string])


    return <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="dateOfBirth">R2 Date</label>
        <div className="flex">
            <KeistarDateTimePicker date={date} setDate={setDate} dateOnly={true} hasTime={false} disabled={false}
                                   setDateOnlyString={setDateString}/>
        </div>
    </div>
}