'use client'
import {usePathname} from 'next/navigation'
import Link from "next/link"
import {cn} from "@/lib/utils"
import clsx from 'clsx';

export function MainNav({
                            className,
                            ...props
                        }: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Link
                href="/workspace/dashboard"
                className={clsx(
                    "text-sm font-medium transition-colors",
                    pathname === "/workspace/dashboard"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                )}
            >
                Overview
            </Link>
            <Link
                href="/workspace/tasks"
                className={clsx(
                    "text-sm font-medium transition-colors",
                    pathname === "/workspace/tasks"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                )}
            >
                Customers
            </Link>
            <Link
                href="/workspace/onboarding"
                className={clsx(
                    "text-sm font-medium transition-colors",
                    pathname === "/workspace/onboarding"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                )}
            >
                Products
            </Link>
            <Link
                href="/workspace/settings"
                className={clsx(
                    "text-sm font-medium transition-colors",
                    pathname === "/workspace/settings"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                )}
            >
                Settings
            </Link>
        </nav>
    )
}
