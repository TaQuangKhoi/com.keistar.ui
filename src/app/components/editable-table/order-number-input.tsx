import {CellContext} from "@tanstack/react-table";
import {useState} from "react";

export default function OrderNumberCell(
    {
        getValue,
        row: {index},
        column: {
            id,
        },
        table
    }: CellContext<unknown, any>
) {
    const initialValue = getValue();

    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
    }

    return index + 1;
}