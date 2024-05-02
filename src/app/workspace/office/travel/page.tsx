'use client'

import {selectedTravelAtom} from "@/app/workspace/office/travel/atoms/travel-selected-atom";
import {useAtom} from "jotai/index";
import {useEffect, useState} from "react";
import Travel_Item from "@/app/workspace/office/travel/types/travel-interface";
import {reloadTravelListAtom} from "@/app/workspace/office/travel/atoms/reload-travel-list-atom";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";

export default function TravelPage() {
    const [selected, setSelected] = useAtom(selectedTravelAtom);
    const [list, setList] = useState<Travel_Item[]>()
    const [reloadList, setReloadList] = useAtom(reloadTravelListAtom);

    useEffect(() => {
        setReloadList(true);
    }, []);

    useEffect(() => {
        if (reloadList) {
            const getData = async () => {
                const employees = await findsBusinessData(
                    "com.keistar.model.office.Employee", "findsOrderByUpdatedDate", 0, 20, {}, 'directManager'
                )
                setList(employees);
            };
            getData();
            setReloadList(false);
        }
    }, [reloadList]);

    /**
     * Default selected employee
     */
    useEffect(() => {
        if (list) {
            setSelected(list[0]);
        }
    }, [list]);

    const titleKey = "username";

    return (
        <div>
            <h1>Travel - Coming soon</h1>
        </div>
    )
}