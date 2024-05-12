'use client'

import {CellContext, ColumnDef} from "@tanstack/react-table";
import React, {useEffect, useState} from "react";
import KeistarDateTimePicker from "@/app/components/keistar-date-time-picker";

export default function DateCell(
    {
        getValue: getValue,
        row: {index},
        column: {
            id,
        },
        table
    }: CellContext<unknown, any>
) {
    const initialValue = getValue();

    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState<Date | undefined>(new Date(initialValue));
    const [dateString, setDateString] = useState<string | Date>('')

    // When the input is blurred, we'll call our table meta's updateData function
    useEffect(() => {
        if (dateString) {
            table.options.meta?.updateData(index, id, dateString);
        }
    }, [dateString]);

    useEffect(() => {
        setValue(new Date(initialValue));
    }, [initialValue]);


    const columns: ColumnDef<unknown, any>[] = table.options.columns
    const indexOfColumn = columns.findIndex((column) => {
        if (column.hasOwnProperty("accessorKey")) {
            // @ts-ignore
            return column.accessorKey === id
        }
    })
    const editable: boolean = table.options.meta?.editable[indexOfColumn - 1] ?? false

    return <KeistarDateTimePicker date={value} setDate={setValue}
                                  dateOnly={true}
                                  setDateOnlyString={setDateString}
                                  hasTime={false}
                                  disabled={!editable}/>
}