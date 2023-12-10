'use client'

import {DropdownMenuLabel} from "@/components/ui/dropdown-menu";

export default function UserInfoDropdownMenuLabel() {
    return <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
                Hảo Văn
            </p>
            <p className="text-xs leading-none text-muted-foreground">
                m@example.com
            </p>
        </div>
    </DropdownMenuLabel>
}