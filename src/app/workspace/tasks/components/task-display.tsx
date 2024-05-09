'use client'

import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Archive, ArchiveX, Clock, Forward, MoreVertical, Reply, ReplyAll, Trash2} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import format from "date-fns/format";
import addHours from "date-fns/addHours";
import addDays from "date-fns/addDays";
import nextSaturday from "date-fns/nextSaturday";
import {Calendar} from "@/components/ui/calendar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import {toast} from "sonner"
import ReviewEleaveForm from "@/app/workspace/office/e-leave/review-eleave-form";
import {ReactElement, useEffect, useState} from "react";
import {processDefRoute} from "@/app/workspace/tasks/process-definitions/process-def-route";
import {KeistarTaskDefinition} from "@/app/workspace/tasks/process-definitions/eleave-process";


interface TaskDisplayProps {
    task: FullHumanTask | null
}

export default function TaskDisplay(
    {task}: TaskDisplayProps
) {
    const today = new Date()
    const currentForm = "review-eleave-form"
    const formComponents = [
        {
            id: "review-eleave-form",
            taskName: "Review E-leave",
            component: (task: FullHumanTask) => <ReviewEleaveForm task={task}/>
        },
        {
            id: "review-travel-form",
            taskName: "Review Travel",
            component: () => <p>Working on it</p>
        }
    ]

    const [taskForm, setTaskForm] = useState<ReactElement>()

    useEffect(() => {
        const process = processDefRoute.find(process => process.processName === task?.rootContainerId.name)
        const __task = process?.taskDefinitions.find((_task: KeistarTaskDefinition) => _task.taskName === task?.name)
        setTaskForm(__task?.component(task as FullHumanTask))
    }, [task]);

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!task}>
                                <Archive className="h-4 w-4"/>
                                <span className="sr-only">Archive</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Archive</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!task}>
                                <ArchiveX className="h-4 w-4"/>
                                <span className="sr-only">Move to junk</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to junk</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!task}
                                    onClick={() => {
                                        toast("Task moved to trash")
                                    }}
                            >
                                <Trash2 className="h-4 w-4"/>
                                <span className="sr-only">Move to trash</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to trash</TooltipContent>
                    </Tooltip>
                    <Separator orientation="vertical" className="mx-1 h-6"/>
                    <Tooltip>
                        <Popover>
                            <PopoverTrigger asChild>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" disabled={!task}>
                                        <Clock className="h-4 w-4"/>
                                        <span className="sr-only">Snooze</span>
                                    </Button>
                                </TooltipTrigger>
                            </PopoverTrigger>
                            <PopoverContent className="flex w-[535px] p-0">
                                <div className="flex flex-col gap-2 border-r px-2 py-4">
                                    <div className="px-4 text-sm font-medium">Snooze until</div>
                                    <div className="grid min-w-[250px] gap-1">
                                        <Button
                                            variant="ghost"
                                            className="justify-start font-normal"
                                        >
                                            Later today{" "}
                                            <span className="ml-auto text-muted-foreground">
                        {format(addHours(today, 4), "E, h:m b")}
                      </span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="justify-start font-normal"
                                        >
                                            Tomorrow
                                            <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 1), "E, h:m b")}
                      </span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="justify-start font-normal"
                                        >
                                            This weekend
                                            <span className="ml-auto text-muted-foreground">
                        {format(nextSaturday(today), "E, h:m b")}
                      </span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="justify-start font-normal"
                                        >
                                            Next week
                                            <span className="ml-auto text-muted-foreground">
                        {format(addDays(today, 7), "E, h:m b")}
                      </span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <Calendar/>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <TooltipContent>Snooze</TooltipContent>
                    </Tooltip>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!task}>
                                <Reply className="h-4 w-4"/>
                                <span className="sr-only">Reply</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!task}>
                                <ReplyAll className="h-4 w-4"/>
                                <span className="sr-only">Reply all</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply all</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!task}>
                                <Forward className="h-4 w-4"/>
                                <span className="sr-only">Forward</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Forward</TooltipContent>
                    </Tooltip>
                </div>
                <Separator orientation="vertical" className="mx-2 h-6"/>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!task}>
                            <MoreVertical className="h-4 w-4"/>
                            <span className="sr-only">More</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                        <DropdownMenuItem>Star thread</DropdownMenuItem>
                        <DropdownMenuItem>Add label</DropdownMenuItem>
                        <DropdownMenuItem>Mute thread</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Separator/>

            {task ? (
                <>
                    <div className="flex flex-1 flex-col">
                        <div className="flex items-start p-4">
                            <div className="flex items-start gap-4 text-sm">
                                {/*<Avatar>*/}
                                {/*    <AvatarImage alt={task.name}/>*/}
                                {/*    <AvatarFallback>*/}
                                {/*        {task.name*/}
                                {/*            .split(" ")*/}
                                {/*            .map((chunk) => chunk[0])*/}
                                {/*            .join("")}*/}
                                {/*    </AvatarFallback>*/}
                                {/*</Avatar>*/}
                                <div className="grid gap-1">
                                    <div className="font-semibold">{task.name}</div>
                                    <div className="line-clamp-1 text-xs">{task.displayName}</div>
                                    <div className="line-clamp-1 text-xs">
                                        <span className="font-medium">Reply-To:</span> {task.rootContainerId.id}
                                    </div>
                                </div>
                            </div>
                            {task.assigned_date && (
                                <div className="ml-auto text-xs text-muted-foreground">
                                    {format(new Date(task.assigned_date), "PPpp")}
                                </div>
                            )}
                        </div>
                        <Separator/>
                        {taskForm}
                    </div>
                </>
            ) : (
                <div className="p-8 text-center text-muted-foreground">
                    No task selected
                </div>
            )}
        </div>
    )
}