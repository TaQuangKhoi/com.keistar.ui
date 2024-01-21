'use client'
import {usePathname} from 'next/navigation'
import Link from "next/link"
import {cn} from "@/lib/utils"
import clsx from 'clsx';
import {useAtomValue} from "jotai";
import {hr_department_items, personal_items} from "@/app/workspace/data/data";
import {useSelectedTeamValue} from "@/app/workspace/hooks/use-selected-team";

export function MainNav({
                            className,
                            ...props
                        }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const team = useSelectedTeamValue()
    const items = team.value === 'personal' ? personal_items : hr_department_items

    return (
        <>
            <nav
                className={cn("max-sm:hidden flex items-center space-x-4 lg:space-x-6", className)}
                {...props}
            >
                {
                    items.map((item) => (
                        <Link key={item.value}
                              href={item.href}
                              className={clsx(
                                  "text-sm font-medium transition-colors",
                                  pathname.includes(item.href)
                                      ? "text-primary"
                                      : "text-muted-foreground hover:text-primary"
                              )}
                        >
                            {item.label}
                        </Link>
                    ))
                }
            </nav>
        </>
    )
}
