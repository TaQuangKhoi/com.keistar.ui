'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FLCtgLNBgt6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Button} from "@/components/ui/button"
import * as React from "react";
import {PrimitiveAtom, useAtom} from "jotai/index";
import {searchProcesses} from "@/bonita/api/bpm/process/definitions/finds-processes";
import {instantiateProcess} from "@/bonita/api/bpm/process";
import {toast} from "sonner";
import getProcessContractById from "@/bonita/api/bpm/process/definitions/finds-process-contract-by-id";
import {WritableAtom} from 'jotai'
import {AxiosError} from "axios";

import {RefreshCw, Play, LucideIcon} from "lucide-react"
import findsBusinessData from "@/bonita/api/bdm/business-data-query";


function _Button(
    {
        children,
        onClick,
        TheIcon,
    }: {
        children?: React.ReactNode,
        onClick: () => void,
        TheIcon: LucideIcon,
    }
) {
    return <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline"
                   onClick={onClick}
    >
        <TheIcon className="h-5 w-5 hover:text-blue-500"/>
        {children}
    </Button>
}

export default function KeistarToolbar(
    {
        selectedAtom,
        defaultValue,
        reloadListAtom,
        listAtom,
        processConfig,
    }:
        {
            selectedAtom: PrimitiveAtom<any>,
            defaultValue?: any,
            reloadListAtom: WritableAtom<boolean, [boolean?], void>,
            listAtom?: PrimitiveAtom<any[]>,
            processConfig: {
                processCreateName: string,
                processUpdateName: string,
                processDeletedName: string,
                businessDataType?: string,
                businessData?: {
                    query: string,
                    params: any,
                },
            }
        }
) {
    const [selectedItem, setSelectedItem] = useAtom(selectedAtom);
    const [, toggle] = useAtom(reloadListAtom);


    const [listState, setListState] = useAtom(listAtom as PrimitiveAtom<any[]>);
    const getData = async () => {
        if (processConfig.businessDataType === undefined) {
            return;
        }
        const _list = await findsBusinessData(
            processConfig.businessDataType,
            processConfig.businessData?.query ? processConfig.businessData?.query : "findsOrderByUpdatedDate",
            0, 20, processConfig.businessData?.params, 'directManager',
        )
        setListState(_list);
    };


    return (
        <div key="1" className="flex flex-wrap gap-2 bg-white p-4 shadow">
            <_Button TheIcon={Play}
                     onClick={async () => {
                         let processId = "";

                         let mode = "create";

                         // Get process ID
                         const processes = await searchProcesses(0, 1, "activationState=ENABLED", "version DESC", processConfig.processCreateName)
                         if (processes.length > 0) {
                             processId = processes[0].id;
                         } else {
                             toast("No process found to create new item",
                                 {
                                     description: "Please contact your administrator",
                                     action: {
                                         label: "Contact",
                                         onClick: () => console.log("Contact"),
                                     },
                                 })
                             return;
                         }

                         const contract = await getProcessContractById(processId);
                         let contractInputName = contract.inputs[0].name;

                         try {
                             const res = await instantiateProcess(processId, {
                                 [contractInputName]: selectedItem
                             });
                             toggle(true);
                             toast(mode === "create" ? "New item has been created successfully" : "Item has been updated successfully",
                                 {
                                     description: "Case ID: " + res.caseId,
                                     action: {
                                         label: "View",
                                         onClick: () => console.log("View"),
                                     },
                                 })
                         } catch (e) {
                             const error = e as AxiosError;
                             toast(error.message,
                                 {
                                     description: "Failed to create new item. Please try again later",
                                     action: {
                                         label: "Retry",
                                         onClick: () => console.log("Retry"),
                                     },
                                 })
                         }
                     }}
            >
                <span>Init</span>
            </_Button>
            <Button className="space-x-1.5 border hover:text-blue-500 transition-transform active:scale-95"
                    variant="outline"
                    onClick={async () => {
                        let processId = "";
                        let contractInputName = "";
                        let mode = "create";

                        // Start Process Create
                        if (
                            selectedItem.persistenceId === undefined ||
                            selectedItem.persistenceId === 0
                        ) {
                            // Get process ID
                            const processes = await searchProcesses(0, 1, "activationState=ENABLED", "version DESC", processConfig.processCreateName)
                            if (processes.length > 0) {
                                processId = processes[0].id;
                            } else {
                                toast("No process found to create new item",
                                    {
                                        description: "Please contact your administrator",
                                        action: {
                                            label: "Contact",
                                            onClick: () => console.log("Contact"),
                                        },
                                    })
                                return;
                            }
                        } else {
                            // Start Process Update
                            const processes = await searchProcesses(0, 1, "activationState=ENABLED", "version DESC", processConfig.processUpdateName)
                            if (processes.length > 0) {
                                processId = processes[0].id;
                                mode = "update";
                            } else {
                                toast("No process found to update item",
                                    {
                                        description: "Please contact your administrator",
                                        action: {
                                            label: "Contact",
                                            onClick: () => console.log("Contact"),
                                        },
                                    })
                                return;
                            }
                        }

                        const contract = await getProcessContractById(processId);
                        contractInputName = contract.inputs[0].name;

                        try {
                            const res = await instantiateProcess(processId, {
                                [contractInputName]: selectedItem
                            });
                            toggle(true);
                            toast(mode === "create" ? "New item has been created successfully" : "Item has been updated successfully",
                                {
                                    description: "Case ID: " + res.caseId,
                                    action: {
                                        label: "View",
                                        onClick: () => console.log("View"),
                                    },
                                })
                        } catch (e) {
                            const error = e as AxiosError;
                            toast(error.message,
                                {
                                    description: "Failed to create new item. Please try again later",
                                    action: {
                                        label: "Retry",
                                        onClick: () => console.log("Retry"),
                                    },
                                })
                        }
                    }}
            >
                <HardDriveIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Save</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95"
                    variant="outline"
                    onClick={() => {
                        setSelectedItem(defaultValue)
                    }}
            >
                <FileIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>New</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline"
            onClick={() => {

            }}>
                <XIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Cancel</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline"
                    onClick={async () => {
                        const processes = await searchProcesses(0, 1, "activationState=ENABLED", "version DESC", processConfig.processDeletedName)
                        const processId = processes[0].id;

                        const contract = await getProcessContractById(processId);
                        const contractInputName = contract.inputs[0].name;

                        try {
                            const res = await instantiateProcess(processId, {
                                [contractInputName]: selectedItem
                            });
                            toggle(true);
                            toast("New e-leave has been created successfully",
                                {
                                    description: "Case ID: " + res.caseId,
                                    action: {
                                        label: "View",
                                        onClick: () => console.log("View"),
                                    },
                                })
                        } catch (e) {
                            const error = e as AxiosError;
                            toast(error.message,
                                {
                                    description: "Failed to create new e-leave. Please try again later",
                                    action: {
                                        label: "Retry",
                                        onClick: () => console.log("Retry"),
                                    },
                                })
                        }
                    }}
            >
                <TrashIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Delete</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <ChevronLeftIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Previous</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <ChevronRightIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Next</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline"
                    onClick={() => {
                        setSelectedItem((draft: {
                            persistenceId_string: string;
                            persistenceId: number | undefined;
                        }) => {
                            draft.persistenceId_string = "";
                            draft.persistenceId = 0;
                        })
                    }}
            >
                <FilesIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Copy</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline"
                    onClick={() => {
                        getData().then(() => {
                            toast("Data has been refreshed successfully",
                                {
                                    description: "Total data: " + listState.length,
                                    action: {
                                        label: "View",
                                        onClick: () => console.log("View"),
                                    },
                                })
                        });
                    }}
            >
                <RefreshCw className="h-5 w-5 hover:text-blue-500"/>
                <span>Refresh</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <PrinterIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Print</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <SplitIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Split</span>
            </Button>
        </div>
    )
}


function ChevronLeftIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6"/>
        </svg>
    )
}


function ChevronRightIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6"/>
        </svg>
    )
}


function FileIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
        </svg>
    )
}


function FilesIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"/>
            <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"/>
            <path d="M15 2v5h5"/>
        </svg>
    )
}


function HardDriveIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="22" x2="2" y1="12" y2="12"/>
            <path
                d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            <line x1="6" x2="6.01" y1="16" y2="16"/>
            <line x1="10" x2="10.01" y1="16" y2="16"/>
        </svg>
    )
}


function PrinterIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect width="12" height="8" x="6" y="14"/>
        </svg>
    )
}


function SplitIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 3h5v5"/>
            <path d="M8 3H3v5"/>
            <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/>
            <path d="m15 9 6-6"/>
        </svg>
    )
}


function TrashIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
    )
}


function XIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}