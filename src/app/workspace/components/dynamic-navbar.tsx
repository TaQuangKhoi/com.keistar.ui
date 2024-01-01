import TeamSwitcher from "@/app/workspace/components/team-switcher";
import {MainNav} from "@/app/workspace/components/main-nav";
import {Search} from "@/app/workspace/components/search";
import Notification from "@/app/workspace/components/Notification";
import {UserNav} from "@/app/workspace/components/user-nav";

export default function DynamicNavbar() {
    return <>
        <TeamSwitcher/>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
            <Search/>
            <Notification/>
            <UserNav/>
        </div>
    </>
}