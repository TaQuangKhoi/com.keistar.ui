'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {
    CellContext,
    ColumnDef, flexRender, getCoreRowModel, useReactTable
} from "@tanstack/react-table";
import React, {useState} from "react";
import TableToolbar from "@/app/components/table-toolbar";
import {Button} from "@/components/ui/button"
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react"
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

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Checkbox} from "@/components/ui/checkbox"
import InputCell from "@/app/components/editable-table/input-cell";
import SelectCell from "@/app/components/editable-table/select-cell";

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
            selectOptions?: any[]
        },
    }
) {
    const [rowSelection, setRowSelection] = useState({})

    const checkBoxColDef: ColumnDef<unknown, any> = {
        id: "checkbox",
        accessorKey: "checkbox",
        header: "Checkbox",
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
            cell: InputCell,
        }
    })

    const columnsDef: ColumnDef<unknown, any>[] = [checkBoxColDef, ...dynamicColumnsDef,
        {
            id: "actions",
            header: "",
            enableHiding: false,
            cell: ({row}) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(row.id)}
                            >
                                Copy row ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                Clone
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

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
                    const newRow: any = config.key.reduce((acc: any, key) => {
                        acc[key] = "";
                        return acc;
                    }, {})
                    const setFunc = (old: any[]) => [...old, newRow];
                    setDataState(setFunc);
                    // setOriginalData(setFunc);
                },
                removeRow: (rowsIndex: number[]) => {
                    const removeFunc = (old: any[]) => {
                        return old.filter((_, index) => !rowsIndex.includes(index));
                    };
                    setRowSelection({});
                    setDataState(removeFunc);
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
                        <TableRow key={row.id}
                                  data-state={row.getIsSelected() && "selected"}
                        >
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