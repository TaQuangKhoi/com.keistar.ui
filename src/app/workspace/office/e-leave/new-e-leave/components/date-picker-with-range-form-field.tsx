import {Label} from "@/components/ui/label";
import DatePickerWithRange from "@/app/cards/components/date-picker-with-range";
import {UseFormReturn} from "react-hook-form";
import * as React from "react";
import {DateRange} from "react-day-picker";
import {addDays, format} from "date-fns";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar as CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export default function DatePickerWithRangeFormField(
    {
        className,
        form,
    }: {
        className?: string,
        form: UseFormReturn<any>,
    }
) {
    // const [date, setDate] = useState<DateRange | undefined>({
    //     from: new Date(2022, 0, 20),
    //     to: addDays(new Date(2022, 0, 20), 20),
    // })


    return <FormField
        control={form.control}
        name="dateRange"
        render={({field}) => (
            <FormItem>
                <FormLabel>Pick a date</FormLabel>
                <FormControl>
                    <div className="space-y-2">
                        <div className={cn("grid gap-2", className)}>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-[300px] justify-start text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {field.value?.from ? (
                                            field.value.to ? (
                                                <>
                                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                                    {format(field.value.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(field.value.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={field.value?.from}
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </FormControl>
                {/*<FormDescription>*/}
                {/*    You can manage verified email addresses in your{" "}*/}
                {/*    <Link href="/examples/forms">email settings</Link>.*/}
                {/*</FormDescription>*/}
                <FormMessage/>
            </FormItem>
        )}
    />
}