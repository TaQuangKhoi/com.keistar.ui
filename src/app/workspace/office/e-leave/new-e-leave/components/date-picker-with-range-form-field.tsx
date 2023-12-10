import {Label} from "@/components/ui/label";
import DatePickerWithRange from "@/app/cards/components/date-picker-with-range";
import {UseFormReturn} from "react-hook-form";

export default function DatePickerWithRangeFormField(
    {
        form,
        fromName,
        toName,
    }: {
        form: UseFormReturn<any>,
        fromName: string,
        toName: string,
    }
) {
    return <div className="space-y-2">
        <Label htmlFor="date" className="shrink-0">
            Pick a date
        </Label>
        <DatePickerWithRange className="[&>button]:w-[260px]"/>
    </div>
}