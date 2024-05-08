import {CellContext, ColumnDef} from "@tanstack/react-table";
import React, {useState} from "react";
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
    // console.debug("column columns", columns)
    const initialValue = getValue();

    const columns: ColumnDef<unknown, any>[] = table.options.columns
    const indexOfColumn = columns.findIndex((column) => {
        if (column.hasOwnProperty("accessorKey")) {
            // @ts-ignore
            return column.accessorKey === id
        }
    })
    const selectOption = table.options.meta?.selectOptions[indexOfColumn - 1]

    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
    }

    return <Select>
        <SelectTrigger>
            <SelectValue placeholder="Select an item"/>
        </SelectTrigger>
        <SelectContent>
            {
                selectOption.map((option: any) => {
                    return <SelectItem key={option.persistenceId}
                                       value={option}>
                        {option.description}
                    </SelectItem>
                })
            }
        </SelectContent>
    </Select>;
}