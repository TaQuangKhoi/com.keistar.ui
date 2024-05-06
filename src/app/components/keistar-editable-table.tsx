'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {
    ColumnDef, flexRender, getCoreRowModel, useReactTable
} from "@tanstack/react-table";
import {useState} from "react";
import TableToolbar from "@/app/components/table-toolbar";

import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

import {Checkbox} from "@/components/ui/checkbox"

export default function KeistarEditableTable(
    {
        title,
        data,
        config,
    }: {
        title: string,
        data: any[]
        config: {
            key: string[],
            head: string[],
            input: string[],
        },
    }
) {
    const [rowSelection, setRowSelection] = useState({})

    const checkBoxColDef: ColumnDef<unknown, any> = {
        id: "checkbox",
        accessorKey: "checkbox",
        header: "test",
        cell: ({row}) => {
            return <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        }
    }

    const dynamicColumnsDef: ColumnDef<unknown, any>[] = config.key.map((item, index) => {
        return {
            accessorKey: config.key[index],
            header: config.head[index],
            cell: (props) => {

                if (config.input[index] === "input") {
                    return <Input placeholder="Enter value"
                                  value={props.getValue()}
                    />;
                }

                if (config.input[index] === "select") {
                    return <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a person"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">
                                John Doe
                            </SelectItem>
                            <SelectItem value="2">
                                Jane Doe
                            </SelectItem>
                        </SelectContent>
                    </Select>;
                }

                if (config.input[index] === "#") {
                    return Number(props.row.id) + 1;
                }
            }
        }
    })

    const columnsDef: ColumnDef<unknown, any>[] = [checkBoxColDef, ...dynamicColumnsDef]

    const [dataState, setDataState] = useState<any[]>(data)
    const table = useReactTable(
        {
            data: dataState,
            columns: columnsDef,
            getCoreRowModel: getCoreRowModel(),
            meta: {
                updateData: (rowIndex: number, columnId: string, value: unknown) => {

                },
                addRow: () => {
                    const newRow: any = {
                        detail: "",
                    };
                    const setFunc = (old: any[]) => [...old, newRow];
                    setDataState(setFunc);
                    // setOriginalData(setFunc);
                },
                removeRow: (rowIndex: number) => {
                    console.debug("removeRow", rowIndex);
                },
            },
            enableRowSelection: true,
            debugTable: true,
            onRowSelectionChange: setRowSelection,
            state: {
                rowSelection,
            }
        })

    return <>
        <TableToolbar title={title} table={table} data={data}/>
        <Table className="border">
            <TableHeader>
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {
                                headerGroup.headers.map((header) => {
                                    const headerString = header.column.columnDef.header?.toString()
                                    return (
                                        <TableCell key={header.id}>
                                            {headerString}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    table.getRowModel().rows?.map((row) => (
                        <TableRow key={row.id}>
                            {
                                row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        }
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </>
}