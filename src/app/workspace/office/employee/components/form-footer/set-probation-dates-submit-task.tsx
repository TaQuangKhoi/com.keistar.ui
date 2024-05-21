import KeistarDateTimePicker from "@/app/components/keistar-date-time-picker";
import {useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {selectedEmployeeAtom} from "@/app/workspace/office/employee/atoms/employee-selected-atom";

export default function SetProbationDatesSubmitTask() {
    const [selectedItem, setSelectedItem] = useAtom(selectedEmployeeAtom);


    const [date, setDate] = useState<Date>()
    const [dateString, setDateString] = useState<string | Date>('')
    useEffect(() => {
        setSelectedItem((draft) => {
            draft.probationStartDate = dateString as string;
        })
    }, [dateString]);


    useEffect(() => {
        if (selectedItem.probationStartDate) {
            setDate(new Date(selectedItem.probationStartDate))
        } else {
            setDate(null as any)
        }
    }, [selectedItem.persistenceId_string])


    const [endDate, setEndDate] = useState<Date>()
    const [endDateString, setEndDateString] = useState<string | Date>('')
    useEffect(() => {
        setSelectedItem((draft) => {
            draft.probationEndDate = endDateString as string;
        })
    }, [endDateString]);
    useEffect(() => {
        if (selectedItem.probationEndDate) {
            setEndDate(new Date(selectedItem.probationEndDate))
        } else {
            setEndDate(null as any)
        }
    }, [selectedItem.persistenceId_string])


    return <div className="flex flex-row ">

        <div className="flex flex-col flex-auto">
            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="dateOfBirth">Probation Start Date</label>
            <KeistarDateTimePicker date={date} setDate={setDate} dateOnly={true} hasTime={false} disabled={false}
                                   setDateOnlyString={setDateString}/>
        </div>

        <div className="flex flex-col flex-auto">
            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="dateOfBirth">Probation End Date</label>
            <KeistarDateTimePicker date={endDate} setDate={setEndDate} dateOnly={true} hasTime={false} disabled={false}
                                   setDateOnlyString={setEndDateString}/>
        </div>
    </div>
}