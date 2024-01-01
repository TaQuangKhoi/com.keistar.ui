'use client';

import TeamSwitcher from "@/app/workspace/components/team-switcher";
import {MainNav} from "@/app/workspace/components/main-nav";
import {Search} from "@/app/workspace/components/search";
import Notification from "@/app/workspace/components/Notification";
import {UserNav} from "@/app/workspace/components/user-nav";

import {useWindowScroll} from "@uidotdev/usehooks";

function FullNavBar() {
    return (
        <div className="border-b top-0 bg-white dark:bg-slate-900">
            <div className="flex h-16 items-center px-4">
                <TeamSwitcher/>
                <MainNav className="mx-6"/>
                <div className="ml-auto flex items-center space-x-4">
                    <Search/>
                    <Notification/>
                    <UserNav/>
                </div>
            </div>
        </div>
    )
}

function CompactNavBar() {
    return (
        <div className="sticky border-b top-0 bg-white dark:bg-slate-900">
            <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6"/>
            </div>
        </div>
    )
}

export default function DynamicNavbar() {
    const [{x, y}, scrollTo] = useWindowScroll();

    // @ts-ignore
    return <>
        {
            y === 0 && <FullNavBar/>
        }
        {
            y > 10 && <CompactNavBar/>
        }
    </>
}