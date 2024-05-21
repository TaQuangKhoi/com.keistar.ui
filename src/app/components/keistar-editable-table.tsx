'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {
    CellContext,
    ColumnDef, flexRender, getCoreRowModel, useReactTable
} from "@tanstack/react-table";
import React, {useEffect, useState} from "react";
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
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Checkbox} from "@/components/ui/checkbox"
import InputCell from "@/app/components/editable-table/input-cell";
import SelectCell from "@/app/components/editable-table/select-cell";
import OrderNumberCell from "@/app/components/editable-table/order-number-input";
import {PrimitiveAtom, useAtom, WritableAtom} from "jotai/index";
import DateCell from "@/app/components/editable-table/date-cell";
import format from "date-fns/format";

export default function KeistarEditableTable(
    {
        title,
        data,
        config,
    }: {
        title: string,
        data: PrimitiveAtom<any>,
        config: {
            key: string[],
            head: string[],
            input: string[],
            selectOptions?: any[],
            editable?: boolean[],
            allowAdd?: boolean,
            allowDelete?: boolean,
            hidden?: boolean[],
        },
    }
) {
    /**
     * Config validation
     */
    //


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


    const dynamicColumnsDef: ColumnDef<unknown, any>[] = config.key.filter((item, index) => config.hidden?.[index] === false)
        .map((item, index) => {
            console.debug("Test")
            const indexOfItem = config.key.indexOf(item)
            const type = config.input[indexOfItem];
            let def = {
                accessorKey: config.key[indexOfItem],
                header: config.head[indexOfItem],
                cell: InputCell,
            } as ColumnDef<unknown, any>
            if (type === "#") {
                def.cell = OrderNumberCell;
            }
            if (type === "select") {
                def.cell = SelectCell;
            }
            if (type === "date") {
                def.cell = DateCell;
            }
            console.debug("def: ", def);
            return def
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

    const [dataState, setDataState] = useAtom(data)

    const table = useReactTable(
        {
            data: dataState,
            columns: columnsDef,
            getCoreRowModel: getCoreRowModel(),
            meta: {
                updateData: (rowIndex: number, columnId: string, value: unknown) => {
                    setDataState((old: any[]) =>
                        old.map((row, index) => {
                            if (index === rowIndex) {
                                return {
                                    ...old[rowIndex]!,
                                    [columnId]: value,
                                }
                            }
                            return row
                        })
                    )
                },
                addRow: () => {
                    const newRow: any = config.key.reduce((acc: any, key) => {
                        const type = config.input[config.key.indexOf(key)];
                        if (type === "select") {
                            acc[key] = config.selectOptions?.[0] || "";
                            return acc;
                        }
                        if (type === "date") {
                            acc[key] = format(new Date(), "yyyy-MM-dd");
                            return acc;
                        }
                        if (type === "persistenceId_string") {
                            acc[key] = null;
                            return acc;
                        }
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
                selectOptions: config.selectOptions || [],
                reloadData: () => {
                    const reloadFunc = (old: any[]) => dataState;
                    setDataState(reloadFunc);
                },
                editable: config.editable || [],
            },
            enableRowSelection: true,
            debugTable: true,
            onRowSelectionChange: setRowSelection,
            state: {
                rowSelection: rowSelection,
            }
        })

    useEffect(() => {
        table.options.meta?.reloadData();
    }, [dataState]);

    return <>
        <TableToolbar title={title} table={table}
                      allowAdd={config.allowAdd}
                      allowDelete={config.allowDelete}
        />
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