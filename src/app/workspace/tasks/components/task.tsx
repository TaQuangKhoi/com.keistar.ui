'use client';

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {Nav} from "@/app/examples/mail/components/nav";
import {
    AlertCircle,
    Archive,
    ArchiveX,
    File,
    Inbox,
    MessagesSquare, Search,
    Send,
    ShoppingCart,
    Trash2,
    Users2
} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import TaskList from "@/app/workspace/tasks/components/task-list";
import TaskDisplay from "@/app/workspace/tasks/components/task-display";

const item = {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "Review Eleave",
    email: "williamsmith@example.com",
    subject: "Create Eleave Process",
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-10-22T09:00:00",
    read: true,
    labels: ["meeting", "work", "important"],
}

export default function Task() {
    let navCollapsedSize = 4;
    let defaultLayout = [265, 440, 655];
    let defaultCollapsed = false;

    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

    return <>
        <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}`
            }}
            className="h-full items-stretch"
        >
            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={15}
                maxSize={20}
                onCollapse={() => {
                    setIsCollapsed(true);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        true
                    )}`
                }}
                onExpand={() => {
                    setIsCollapsed(false);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        false
                    )}`
                }}
                className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
            >
                <div className={cn("flex h-[56px] items-center justify-center", isCollapsed ? 'h-[56px]' : 'px-2')}>
                    {/*<AccountSwitcher isCollapsed={isCollapsed} accounts={accounts}/>*/}
                </div>
                <Separator/>
                <Nav
                    isCollapsed={isCollapsed}
                    links={[
                        {
                            title: "Inbox",
                            label: "128",
                            icon: Inbox,
                            variant: "default",
                        },
                        {
                            title: "Drafts",
                            label: "9",
                            icon: File,
                            variant: "ghost",
                        },
                        {
                            title: "Sent",
                            label: "",
                            icon: Send,
                            variant: "ghost",
                        },
                        {
                            title: "Junk",
                            label: "23",
                            icon: ArchiveX,
                            variant: "ghost",
                        },
                        {
                            title: "Trash",
                            label: "",
                            icon: Trash2,
                            variant: "ghost",
                        },
                        {
                            title: "Archive",
                            label: "",
                            icon: Archive,
                            variant: "ghost",
                        },
                    ]}
                />
                <Separator/>
                <Nav
                    isCollapsed={isCollapsed}
                    links={[
                        {
                            title: "Social",
                            label: "972",
                            icon: Users2,
                            variant: "ghost",
                        },
                        {
                            title: "Updates",
                            label: "342",
                            icon: AlertCircle,
                            variant: "ghost",
                        },
                        {
                            title: "Forums",
                            label: "128",
                            icon: MessagesSquare,
                            variant: "ghost",
                        },
                        {
                            title: "Shopping",
                            label: "8",
                            icon: ShoppingCart,
                            variant: "ghost",
                        },
                        {
                            title: "Promotions",
                            label: "21",
                            icon: Archive,
                            variant: "ghost",
                        },
                    ]}
                />
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Inbox</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                                All tasks
                            </TabsTrigger>
                            <TabsTrigger value="assigned" className="text-zinc-600 dark:text-zinc-200">
                                Assigned tasks
                            </TabsTrigger>
                            <TabsTrigger value="unassigned" className="text-zinc-600 dark:text-zinc-200">
                                Unassigned tasks
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator/>
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                                <Input placeholder="Search" className="pl-8"/>
                            </div>
                        </form>
                    </div>
                    <TabsContent value="all" className="m-0">
                        {/*<MailList items={mails}/>*/}
                        <TaskList/>
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                        {/*<MailList items={mails.filter((item) => !item.read)}/>*/}
                        <TaskList/>
                    </TabsContent>
                </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={defaultLayout[2]}>
                {/*<MailDisplay*/}
                {/*    mail={mails.find((item) => item.id === mail.selected) || null}*/}
                {/*/>*/}
                <TaskDisplay mail={item}/>
            </ResizablePanel>
        </ResizablePanelGroup>
    </>
}