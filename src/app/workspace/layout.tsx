import DynamicNavbar from "@/app/workspace/components/dynamic-navbar";
import ShortcutRegister from "@/app/workspace/components/shortcut-register";
import {cn} from "@/lib/utils";

interface WorkspaceLayoutProps {
    children: React.ReactNode
}

export default function WorkspaceLayout({children}: WorkspaceLayoutProps) {
    return (
        <div className="flex-col md:flex">
            <ShortcutRegister/>
            <DynamicNavbar/>
            <div className={cn(
                "flex-1 space-y-4",
            )}>
                {children}
            </div>
        </div>
    )
}
