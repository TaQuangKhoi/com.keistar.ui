'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {motion} from "framer-motion";
import {Loader2} from "lucide-react";
import {useAtom} from "jotai/index";
import {useImmerAtom} from 'jotai-immer';
import {employeeListAtom} from "@/app/workspace/office/employee/atoms/employee-list-atom";
import {useEffect, useState} from "react";
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";
import callLink from "@/bonita/api/bdm/call-link";
import {selectedEmployeeAtom} from "@/app/workspace/office/employee/atoms/employee-selected-atom";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";

export default function Employee_DirectManagerComponent() {
    const [employees, setEmployees] = useAtom(employeeListAtom);



    useEffect(() => {
        if (employees.length === 0) {
            const getData = async () => {
                const _list = await findsBusinessData(
                    "com.keistar.model.office.Employee",
                    "findsOrderByUpdatedDate",
                    0, 20,
                    {},
                )
                setEmployees(_list);
            };
            getData();
            return;
        }
    }, [employees]);


    const [selectedItem, setSelectedItem] = useImmerAtom(selectedEmployeeAtom);
    useEffect(() => {
        if (!selectedItem.directManager_persistenceId) {
            setSelectedItem((draft) => {
                draft.directManager_persistenceId = ""
            })
        }
    }, [selectedItem.directManager_persistenceId]);


    const [directManager, setDirectManager] = useState<Employee_Item>()
    useEffect(() => {
        // Get user from Bonita Engine
        const getDirectManager = async () => {
            if (selectedItem.links !== undefined) {
                const directManagerLink = selectedItem.links.find((link) => link.rel === "directManager") || {href: ""}
                const data = await callLink(directManagerLink.href)
                setDirectManager(data);

                setSelectedItem((draft) => {
                    draft.directManager_persistenceId = directManager?.persistenceId_string || ""
                })
            }
        }
        getDirectManager();
    }, [selectedItem.username]);


    return <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700"
               htmlFor="directManager">
            Direct Manager
        </label>
        {
            employees === undefined && (
                <Select>
                    <SelectTrigger>
                        <motion.div
                            animate={{rotate: 360}}
                            transition={{repeat: Infinity, duration: 1, ease: "linear"}}
                        >
                            <Loader2/>
                        </motion.div>
                    </SelectTrigger>
                </Select>
            )
        }
        {
            employees !== undefined && (
                <Select
                    value={directManager?.persistenceId_string || ""}
                    // defaultValue={directManager?.persistenceId_string || ""}
                    onValueChange={(value) => {
                        setSelectedItem((draft) => {
                            draft.directManager_persistenceId = value
                        })
                        setDirectManager(employees.find((employee) => employee.persistenceId_string === value))
                    }}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                "Select a direct manager"
                            }/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            employees.filter(option => option.persistenceId_string !== selectedItem.persistenceId_string).map((option, index) => (
                                <SelectItem key={index} value={option.persistenceId_string || ""}>
                                    {option.username}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            )}
    </div>
}