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
    MessagesSquare,
    Search,
    Send,
    ShoppingCart,
    Trash2,
    Users2
} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import TaskList from "@/app/workspace/tasks/components/task-list";
import TaskDisplay from "@/app/workspace/tasks/components/task-display";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import {faker} from "@faker-js/faker";
import {useTask} from "@/app/workspace/tasks/use-task";
import {findsHumanTasks} from "@/bonita/api/bpm/human-task/definitions";

const items: FullHumanTask[] = [
    {
        displayDescription: "",
        executedBy: faker.number.int({max: 1000, min: 1}).toString(),
        rootContainerId: {
            displayDescription: "",
            deploymentDate: faker.date.past().toISOString(),
            displayName: "Create E-Leave Request",
            name: "Create_Eleave",
            description: "",
            deployedBy: faker.number.int({max: 1000, min: 1}).toString(),
            id: "8569231201909689792",
            activationState: "ENABLED",
            version: "1.3.0.alpha",
            configurationState: "RESOLVED",
            last_update_date: faker.date.past().toISOString(),
            actorinitiatorid: faker.number.int({max: 1000, min: 1}).toString(),
        },
        assigned_date: faker.date.past().toISOString(),
        displayName: "Review E-leave",
        executedBySubstitute: faker.number.int({max: 1000, min: 0}).toString(),
        dueDate: "",
        description: "",
        type: "USER_TASK",
        priority: "normal",
        actorId: faker.number.int({max: 1000, min: 1}).toString(),
        processId: "8569231201909689792",
        caseId: faker.number.int({max: 10000, min: 1}).toString(),
        name: "Review E-leave",
        reached_state_date: faker.date.past().toISOString(),
        rootCaseId: faker.number.int({max: 10000, min: 1}).toString(),
        id: faker.number.int({max: 1000000, min: 1}).toString(),
        state: "ready",
        parentCaseId: faker.number.int({max: 10000, min: 1}).toString(),
        last_update_date: faker.date.past().toISOString(),
        assigned_id: faker.number.int({max: 1000, min: 1}).toString(),
    },
    {
        displayDescription: "",
        executedBy: faker.number.int({max: 1000, min: 1}).toString(),
        rootContainerId: {
            displayDescription: "",
            deploymentDate: faker.date.past().toISOString(),
            displayName: "Create E-Leave Request",
            name: "Create_Eleave",
            description: "",
            deployedBy: faker.number.int({max: 1000, min: 1}).toString(),
            id: "8569231201909689792",
            activationState: "ENABLED",
            version: "1.3.0.alpha",
            configurationState: "RESOLVED",
            last_update_date: faker.date.past().toISOString(),
            actorinitiatorid: faker.number.int({max: 1000, min: 1}).toString(),
        },
        assigned_date: faker.date.past().toISOString(),
        displayName: "Năm tháng trôi",
        executedBySubstitute: faker.number.int({max: 1000, min: 0}).toString(),
        dueDate: "",
        description: "",
        type: "USER_TASK",
        priority: "normal",
        actorId: faker.number.int({max: 1000, min: 1}).toString(),
        processId: "8569231201909689792",
        caseId: faker.number.int({max: 10000, min: 1}).toString(),
        name: "Review E-leave",
        reached_state_date: faker.date.past().toISOString(),
        rootCaseId: faker.number.int({max: 10000, min: 1}).toString(),
        id: faker.number.int({max: 1000000, min: 1}).toString(),
        state: "ready",
        parentCaseId: faker.number.int({max: 10000, min: 1}).toString(),
        last_update_date: faker.date.past().toISOString(),
        assigned_id: faker.number.int({max: 1000, min: 1}).toString(),
    }
]

export {items}

export default function Task() {
    let navCollapsedSize = 4;
    let defaultLayout = [265, 440, 655];
    let defaultCollapsed = false;

    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
    const [task, setTask] = useTask()

    const [tasks, setTasks] = useState<FullHumanTask[]>([])

    useEffect(() => {
        getData().then((data) => {
            setTasks(data)
        })
    }, [])

    const getData = async () => {
        return await findsHumanTasks(
            0,
            50,
            "", //user_id%3D815
            "displayName%20ASC",
            null,
            ["rootContainerId"]
        )
    }

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
                <div className={cn("flex h-[56px] tasks-center justify-center", isCollapsed ? 'h-[56px]' : 'px-2')}>
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
                        <TaskList items={tasks}/>
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                        <TaskList items={tasks}/>
                    </TabsContent>
                </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={defaultLayout[2]}>
                {/*<MailDisplay*/}
                {/*    mail={mails.find((item) => item.id === mail.selected) || null}*/}
                {/*/>*/}
                <TaskDisplay task={
                    tasks.find((item) => item.id === task.selected) || null
                }/>
            </ResizablePanel>
        </ResizablePanelGroup>
    </>
}