'use client'

import {DropdownMenuItem, DropdownMenuShortcut} from "@/components/ui/dropdown-menu";
import {logout} from "@/bonita/api/identity/authentication";
import {redirect, useRouter} from 'next/navigation';

export default function LogoutDropdownMenuItem() {
    const router = useRouter();

    async function onClick() {
        const res = await logout();
        if (res.status === 200) {
            // reload page to force login
            router.push('/authentication');
        }
    }

    return (
        <DropdownMenuItem onClick={onClick}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
    )
}