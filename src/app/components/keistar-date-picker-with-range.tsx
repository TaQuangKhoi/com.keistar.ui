"use client"

import * as React from "react"
import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Dispatch, SetStateAction} from "react";
import {Input} from "@/components/ui/input";

export type DateRangeString = {
    from: string | undefined;
    to?: string | undefined;
}

export default function KeistarDatePickerWithRange(
    {
        className,
        date,
        setDate,
        disabled = false,

        dateOnly = false,
        setDateOnlyString,

        hasTime = false,
    }: {
        className?: string,
        date: DateRange | undefined,
        setDate: (date: DateRange | undefined) => void,
        disabled?: boolean,
        dateOnly?: boolean,
        setDateOnlyString?: Dispatch<SetStateAction<DateRangeString>>,

        hasTime?: boolean,
    }
) {

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild disabled={disabled}>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
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
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(date) => {
                            if (dateOnly && date && date.to && date.from) {
                                // format DD/MM/YYYY
                                const dateFrom = format(date.from, "yyyy-MM-dd")

                                const dateTo = format(date.to, "yyyy-MM-dd")
                                if (setDateOnlyString) {
                                    setDateOnlyString({
                                        from: dateFrom,
                                        to: dateTo,
                                    })
                                }
                            }
                            setDate(date)
                        }}
                        numberOfMonths={2}
                    />
                    {
                        hasTime && (
                            <div className="grid grid-cols-2 gap-4 mb-4 mx-4">
                                <Input placeholder="08:00"
                                       type="time"
                                       value={date && date.from ? format(date.from, "HH:mm") : ""}
                                       onChange={(e) => {
                                           if (date && date.from) {
                                               const time = e.target.value
                                               const dateFrom = new Date(date.from)
                                               dateFrom.setHours(parseInt(time.split(":")[0]))
                                               dateFrom.setMinutes(parseInt(time.split(":")[1]))
                                               setDate({
                                                   from: dateFrom,
                                                   to: date.to
                                               })
                                           }
                                       }}
                                />
                                <Input placeholder="08:00"
                                       type="time"
                                        value={date && date.to ? format(date.to, "HH:mm") : ""}
                                       onChange={(e) => {
                                           if (date && date.to) {
                                               const time = e.target.value
                                               const dateTo = new Date(date.to)
                                               dateTo.setHours(parseInt(time.split(":")[0]))
                                               dateTo.setMinutes(parseInt(time.split(":")[1]))
                                               setDate({
                                                   from: date.from,
                                                   to: dateTo
                                               })
                                           }
                                       }}
                                />
                            </div>
                        )
                    }
                </PopoverContent>
            </Popover>
        </div>
    )
}
