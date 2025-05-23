import {RowData} from "@tanstack/react-table";

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void,
        addRow: () => void
        removeRow: (rowsIndex: number[]) => void,
        reloadData: () => void
        selectOptions: any[],
        editable: boolean[],
    }
}