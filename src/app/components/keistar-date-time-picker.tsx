"use client"

import * as React from "react"
import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"

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

export default function KeistarDateTimePicker(
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
        date: Date | undefined,
        setDate: (date: Date | undefined) => void,
        disabled?: boolean,
        dateOnly?: boolean,
        setDateOnlyString?: Dispatch<SetStateAction<Date | string>>,

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
                        {date ? (
                            <>
                                {format(date, "LLL dd, y")}
                                {
                                    hasTime && (
                                        <>
                                            &nbsp;<span>{format(date, "hh:mm a")}</span>
                                        </>
                                    )
                                }
                            </>
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="single"
                        defaultMonth={date}
                        selected={date}
                        onSelect={(date) => {
                            if (dateOnly && date) {
                                // format DD/MM/YYYY
                                const dateString = format(date, "yyyy-MM-dd")

                                if (setDateOnlyString) {
                                    setDateOnlyString(dateString)
                                }
                            }
                            setDate(date)
                        }}
                    />
                    {
                        hasTime && (
                            <div className="grid grid-cols-1 gap-4 mb-4 mx-4">
                                <Input placeholder="08:00"
                                       type="time"
                                       value={date && date ? format(date, "HH:mm") : ""}
                                       onChange={(e) => {
                                           if (date) {
                                               const time = e.target.value
                                               const _date: Date = new Date(date)
                                               _date.setHours(parseInt(time.split(":")[0]))
                                               _date.setMinutes(parseInt(time.split(":")[1]))
                                               setDate(_date)
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
