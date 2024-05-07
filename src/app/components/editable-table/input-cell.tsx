import {CellContext} from "@tanstack/react-table";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";

export default function InputCell(
    {
        getValue,
        row: {index},
        column: {
            id,
        },
        table
    }: CellContext<unknown, any>
) {
    // console.debug("column columns", columns)
    const initialValue = getValue();

    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
    }

    return <Input placeholder="Enter value"
                  value={value as string}
                  onChange={e => setValue(e.target.value)}
                  onBlur={onBlur}
    />;
}