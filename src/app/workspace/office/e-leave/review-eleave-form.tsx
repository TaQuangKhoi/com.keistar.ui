import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import format from "date-fns/format";
import {Separator} from "@/components/ui/separator";
import {
    getContextByUserTaskId,
} from "@/bonita/api/bpm/user-task/definitions/finds-context-by-user-task-id";
import {useEffect, useState} from "react";
import {default as axios} from "@/lib/axios-instance";
import E_leave from "@/app/workspace/office/e-leave/e_leave_type";
import {getUserById} from "@/bonita/api/identity/user/definitions/finds-the-user-by-id";
import {User} from "@/bonita/api/bpm/archived-process-instance/types";

export default function ReviewEleaveForm({task}: { task: FullHumanTask }) {
    const [context, setContext] = useState()
    const [e_leave, setE_leave] = useState<E_leave>({})
    const [requester, setRequester] = useState<User>({
        firstname: "",
        lastname: "",
    })

    /**
     * Display the e-leave in the form by input tags
     */
    const [e_leaveDisplay, setE_leaveDisplay] = useState<any>([])

    /**
     * Get the context of the task, then get the e-leave from the context
     */
    useEffect(() => {
        getContextByUserTaskId(task.id).then((data) => {
            setContext(data)
            axios.get(data.eleave_ref.link, {
                withCredentials: true,
            }).then((response) => {
                setE_leave(response.data)
            });
        })
    }, [task]);

    /**
     * Get the requester of the e-leave
     */
    useEffect(() => {
        getUserById(e_leave.requestor).then((data) => {
            setRequester(data)
        });
    }, [e_leave]);

    useEffect(() => {
        setE_leaveDisplay([
            {
                key: "Requester",
                value: requester.firstname + " " + requester.lastname,
            },
            {
                key: "From Date",
                value: e_leave.startDate ? format(new Date(e_leave?.startDate), "dd/MM/yyyy") : "",
            },
            {
                key: "To Date",
                value: e_leave.endDate ? format(new Date(e_leave?.endDate), "dd/MM/yyyy") : "",
            },
            {
                key: "Total Days",
                value: e_leave.totalDays,
            },
            {
                key: "Date Status",
                value: e_leave.status,
            },
        ])
    }, [requester, e_leave]);

    function inputStyle(): string {
        return "cursor-not-allowed my-2"
    }

    return <div className="flex flex-1 flex-col">
        <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
                <Avatar>
                    <AvatarImage alt={task.name}/>
                    <AvatarFallback>
                        {task.name
                            .split(" ")
                            .map((chunk) => chunk[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
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

        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {
                e_leaveDisplay.map((item : {key: string, value: string}) => {
                    return (
                        <div key={item.key}>
                            <Label>
                                {item.key}
                            </Label>
                            <Input type="text"
                                   className={inputStyle()}
                                   placeholder={item.key}
                                   value={item.value}
                            />
                        </div>
                    )
                })
            }
            {
                task && Object.entries(task).map(([key, value]) => {
                    if (typeof value === 'object') {
                        return null
                    }
                    return (
                        <div key={key}>
                            <Label>
                                {key}
                            </Label>
                            <Input type="text"
                                   placeholder={key}
                                   value={value}
                                   disabled={true}
                            />
                        </div>
                    )
                })
            }
        </div>

        <Separator className="mt-auto"/>
        <div className="p-4">
            <form>
                <div className="grid gap-4">
                    <Textarea
                        className="p-4"
                        placeholder={`Reply ${task.name}...`}
                    />
                    <div className="flex items-center">
                        <Label
                            htmlFor="mute"
                            className="flex items-center gap-2 text-xs font-normal"
                        >
                            <Switch id="mute" aria-label="Mute thread"/> Mute this
                            thread
                        </Label>
                        <Button
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                            className="ml-auto"
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}