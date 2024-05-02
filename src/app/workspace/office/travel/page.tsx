'use client'

import {selectedTravelAtom} from "@/app/workspace/office/travel/atoms/travel-selected-atom";
import {useAtom} from "jotai/index";
import {useState} from "react";
import Travel_Item from "@/app/workspace/office/travel/types/travel-interface";
import {reloadTravelListAtom} from "@/app/workspace/office/travel/atoms/reload-travel-list-atom";

export default function TravelPage() {
    const [selected, setSelected] = useAtom(selectedTravelAtom);
    const [list, setList] = useState<Travel_Item[]>()
    const [reloadList, setReloadList] = useAtom(reloadTravelListAtom);

    return (
        <div>
            <h1>Travel - Coming soon</h1>
        </div>
    )
}