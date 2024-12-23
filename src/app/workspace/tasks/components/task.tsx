'use client';

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {Nav} from "@/app/examples/mail/components/nav";
import {
    ListTodo,
    CheckSquare2,
    Search,
    RefreshCw,
} from "lucide-react";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import TaskList from "@/app/workspace/tasks/components/task-list";
import TaskDisplay from "@/app/workspace/tasks/components/task-display";
import {useTask} from "@/app/workspace/tasks/use-task";
import {findsHumanTasks} from "@/bonita/api/bpm/human-task/finds-human-tasks";
import {useSession} from "@/bonita/api/system/get-the-current-user-session";
import {useAtom} from "jotai";
import {tasksAtom} from "@/app/workspace/tasks/atoms/tasks-atom";
import {tasksLoadingAtom} from "@/app/workspace/tasks/atoms/tasks-loading-atom";
import {toast} from "sonner";
import {useAnimate} from "framer-motion";

export default function Task() {
    let navCollapsedSize = 4;
    let defaultLayout = [265, 440, 655];
    let defaultCollapsed = false;

    const [session, loadingSession, errorSession] = useSession();

    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
    const [task, setTask] = useTask()


    const [tasks, setTasks] = useAtom(tasksAtom);
    useEffect(() => {
        if (session.user_id === undefined) {
            return
        }
        setTasksLoading(true)

        getTaslListData().then((data) => {
            setTasks(data)
            setTasksLoading(false)
        })
    }, [session.user_id])


    const [tasksLoading, setTasksLoading] = useAtom(tasksLoadingAtom);
    useEffect(() => {
        if (!tasksLoading) {
            return
        }
        getTaslListData().then((data) => {
            setTasks(data)
            setTasksLoading(false)
        })
    }, [tasksLoading]);
    const getTaslListData = async () => {
        return await findsHumanTasks(
            0,
            50,
            "user_id%3D" + session?.user_id,
            "displayName%20ASC",
            null,
            ["rootContainerId"]
        )
    }


    const [scope, animate] = useAnimate();


    return <div className="">
        <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}`
            }}
            style={{height: "calc(100vh - 65px)"}}
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
                            title: "To do",
                            label: tasks.length.toString(),
                            icon: ListTodo,
                            variant: "default",
                        },
                        {
                            title: "Done tasks",
                            label: "0",
                            icon: CheckSquare2,
                            variant: "ghost",
                        },
                        // {
                        //     title: "Sent",
                        //     label: "",
                        //     icon: Send,
                        //     variant: "ghost",
                        // },
                        // {
                        //     title: "Junk",
                        //     label: "23",
                        //     icon: ArchiveX,
                        //     variant: "ghost",
                        // },
                        // {
                        //     title: "Trash",
                        //     label: "",
                        //     icon: Trash2,
                        //     variant: "ghost",
                        // },
                        // {
                        //     title: "Archive",
                        //     label: "",
                        //     icon: Archive,
                        //     variant: "ghost",
                        // },
                    ]}
                />
                {/*<Separator/>*/}
                {/*<Nav*/}
                {/*    isCollapsed={isCollapsed}*/}
                {/*    links={[*/}
                {/*        {*/}
                {/*            title: "Social",*/}
                {/*            label: "972",*/}
                {/*            icon: Users2,*/}
                {/*            variant: "ghost",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            title: "Updates",*/}
                {/*            label: "342",*/}
                {/*            icon: AlertCircle,*/}
                {/*            variant: "ghost",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            title: "Forums",*/}
                {/*            label: "128",*/}
                {/*            icon: MessagesSquare,*/}
                {/*            variant: "ghost",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            title: "Shopping",*/}
                {/*            label: "8",*/}
                {/*            icon: ShoppingCart,*/}
                {/*            variant: "ghost",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            title: "Promotions",*/}
                {/*            label: "21",*/}
                {/*            icon: Archive,*/}
                {/*            variant: "ghost",*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*/>*/}
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Tabs defaultValue="all">
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Task List</h1>
                        <div ref={scope}>
                            <RefreshCw
                                className="w-5 h-5 ml-2 cursor-pointer text-muted-foreground dark:text-muted-foreground"
                                onClick={() => {
                                    animate(
                                        [
                                            ["svg", {rotate: [0, 360],}, {duration: 0.3,},]
                                        ]
                                    )

                                    // Infinite loop
                                    // animate(
                                    //     "svg", {rotate: [0, 360],}, {duration: 0.3, repeat: Infinity}
                                    // )
                                    setTasksLoading(true)

                                    toast(
                                        "Refreshing tasks",
                                        {
                                            position: "top-right",
                                        }
                                    )
                                }}
                            />
                        </div>

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
                    <TabsContent value="unassigned" className="m-0">
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
    </div>
}