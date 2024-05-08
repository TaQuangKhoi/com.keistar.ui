'use client'

import {CellContext, ColumnDef} from "@tanstack/react-table";
import React, {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function SelectCell(
    {
        getValue,
        row: {index},
        column: {
            id,
        },
        table,
    }: CellContext<unknown, any>
) {
    const initialValue = getValue();

    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    const columns: ColumnDef<unknown, any>[] = table.options.columns
    const indexOfColumn = columns.findIndex((column) => {
        if (column.hasOwnProperty("accessorKey")) {
            // @ts-ignore
            return column.accessorKey === id
        }
    })
    const selectOption = table.options.meta?.selectOptions[indexOfColumn - 1]

    useEffect(() => {
        setValue(initialValue.persistenceId_string);
    }, [initialValue]);

    return <Select
        onValueChange={(value) => {
            setValue(value)
            const newOption = selectOption.filter((option: any) => option.persistenceId_string === value)[0]
            console.debug("newOption", newOption)
            table.options.meta?.updateData(index, id, newOption)
        }}
        value={value}
    >
        <SelectTrigger>
            <SelectValue
                placeholder={selectOption.filter((option: any) => option.persistenceId_string === value)[0]?.description}
                defaultValue={value}
            />
        </SelectTrigger>
        <SelectContent>
            {
                selectOption.map((option: any) =>
                    <SelectItem key={option.persistenceId_string}
                                value={option.persistenceId_string}
                    >
                        {option.description}
                    </SelectItem>)
            }
        </SelectContent>
    </Select>;
}