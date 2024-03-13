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
    const [requester, setRequester] = useState<User>()

    useEffect(() => {
        getContextByUserTaskId(task.id).then((data) => {
            setContext(data)
            axios.get(data.eleave_ref.link, {
                withCredentials: true,
            }).then((response) => {
                console.debug(response.data)
                setE_leave(response.data)
            });
        })
    }, [task]);

    useEffect(() => {
        getUserById(e_leave.requestor).then((data) => {
            setRequester(data)
        });
    }, [e_leave]);

    function test(): string | number | readonly string[] | undefined {
        return requester?.firstname
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
            <div>
                <Label>
                    Requestor
                </Label>
                <Input type="text"
                       placeholder=""
                       value={requester?.firstname + " " + requester?.lastname}
                       disabled={true}
                />
            </div>
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