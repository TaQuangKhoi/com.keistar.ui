import {Label} from "@/components/ui/label";
import DatePickerWithRange from "@/app/cards/components/date-picker-with-range";

export default function DatePickerWithRangeFormField() {
    return <div className="space-y-2">
        <Label htmlFor="date" className="shrink-0">
            Pick a date
        </Label>
        <DatePickerWithRange className="[&>button]:w-[260px]"/>
    </div>
}