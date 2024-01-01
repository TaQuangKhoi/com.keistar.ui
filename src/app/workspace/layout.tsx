import DynamicNavbar from "@/app/workspace/components/dynamic-navbar";

interface WorkspaceLayoutProps {
    children: React.ReactNode
}

export default function WorkspaceLayout({children}: WorkspaceLayoutProps) {
    return (
        <div className="flex-col md:flex">
            <div className="border-b sticky top-0 bg-white dark:bg-slate-900">
                <div className="flex h-16 items-center px-4">
                    <DynamicNavbar/>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
        </div>
    )
}
