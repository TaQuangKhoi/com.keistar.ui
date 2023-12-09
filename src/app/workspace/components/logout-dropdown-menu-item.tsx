'use client'

import {DropdownMenuItem, DropdownMenuShortcut} from "@/components/ui/dropdown-menu";
import {logout} from "@/bonita/api/identity/authentication";

export default function LogoutDropdownMenuItem() {
    async function onClick() {
        const res = await logout();
    }

    return (
        <DropdownMenuItem onClick={onClick}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
    )
}