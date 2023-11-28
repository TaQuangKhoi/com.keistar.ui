import {MainNav} from "./components/main-nav"
import {Search} from "./components/search"
import TeamSwitcher from "./components/team-switcher"
import {UserNav} from "./components/user-nav"

interface WorkspaceLayoutProps {
    children: React.ReactNode
}

export default function WorkspaceLayout({children}: WorkspaceLayoutProps) {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b sticky top-0 ">
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
