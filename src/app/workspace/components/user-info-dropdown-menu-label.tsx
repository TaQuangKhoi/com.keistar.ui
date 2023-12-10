'use client'

import {DropdownMenuLabel} from "@/components/ui/dropdown-menu";
import {useAtomValue} from "jotai";
import {userNameAtom} from "@/app/workspace/atoms";

export default function UserInfoDropdownMenuLabel() {
    const userName = useAtomValue(userNameAtom)

    return <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
                {userName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
                haov348@gmail.com
            </p>
        </div>
    </DropdownMenuLabel>
}