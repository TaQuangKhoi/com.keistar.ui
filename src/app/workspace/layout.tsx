import DynamicNavbar from "@/app/workspace/components/dynamic-navbar";
import ShortcutRegister from "@/app/workspace/components/shortcut-register";

interface WorkspaceLayoutProps {
    children: React.ReactNode
}

export default function WorkspaceLayout({children}: WorkspaceLayoutProps) {
    return (
        <div className="flex-col md:flex">
            <ShortcutRegister/>
            <DynamicNavbar/>
            <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
        </div>
    )
}
