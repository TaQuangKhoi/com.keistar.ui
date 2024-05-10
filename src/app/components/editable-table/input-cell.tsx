'use client'

import {CellContext, ColumnDef} from "@tanstack/react-table";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";

export default function InputCell(
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
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
    }

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);


    const columns: ColumnDef<unknown, any>[] = table.options.columns
    const indexOfColumn = columns.findIndex((column) => {
        if (column.hasOwnProperty("accessorKey")) {
            // @ts-ignore
            return column.accessorKey === id
        }
    })
    const editable: boolean = table.options.meta?.editable[indexOfColumn - 1]


    return <Input placeholder="Enter value"
                  value={value as string}
                  onChange={e => setValue(e.target.value)}
                  onBlur={onBlur}
                  disabled={!editable}
    />;
}