import {MainNav} from "./components/main-nav"
import {Search} from "./components/search"
import TeamSwitcher from "./components/team-switcher"
import {UserNav} from "./components/user-nav"
import {atom} from 'jotai'

interface WorkspaceLayoutProps {
    children: React.ReactNode
}

const items = atom([
    {
        label: "Dashboard",
        value: "dashboard",
        href: "/workspace/dashboard",
    },
    {
        label: "Tasks",
        value: "tasks",
        href: "/workspace/tasks",
    },
    {
        label: "Onboarding",
        value: "onboarding",
        href: "/workspace/onboarding",
    },
    {
        label: "Settings",
        value: "settings",
        href: "/workspace/settings",
    },
])

export default function WorkspaceLayout({children}: WorkspaceLayoutProps) {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b sticky top-0 bg-white">
                    <div className="flex h-16 items-center px-4">
                        <TeamSwitcher/>
                        <MainNav className="mx-6"/>
                        <div className="ml-auto flex items-center space-x-4">
                            <Search/>
                            <UserNav/>
                        </div>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
            </div>
        </>
    )
}
