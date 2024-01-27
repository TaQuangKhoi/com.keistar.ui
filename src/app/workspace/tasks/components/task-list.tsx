import {ScrollArea} from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {Badge} from "@/components/ui/badge";
import { faker } from '@faker-js/faker';
import {useTask} from "@/app/workspace/tasks/use-task";
import {HumanTask} from "@/bonita/api/bpm/human-task/types";
import {ProcessDefinition} from "@/bonita/api/bpm/archived-process-instance/types";

const items: HumanTask[] = [
    {
        displayDescription: "",
        executedBy: "0",
        rootContainerId: {
            displayDescription: "",
            deploymentDate: "2024-01-27 15:49:53.807",
            displayName: "Create E-Leave Request",
            name: "Create_Eleave",
            description: "",
            deployedBy: "103",
            id: "8569231201909689792",
            activationState: "ENABLED",
            version: "1.3.0.alpha",
            configurationState: "RESOLVED",
            last_update_date: "2024-01-27 15:49:54.771",
            actorinitiatorid: "508"
        } as ProcessDefinition,
        assigned_date: "2024-01-27 15:50:38.255",
        displayName: "Review E-leave",
        executedBySubstitute: "0",
        dueDate: "",
        description: "",
        type: "USER_TASK",
        priority: "normal",
        actorId: "508",
        processId: "8569231201909689792",
        caseId: "7002",
        name: "Review E-leave",
        reached_state_date: "2024-01-27 15:50:38.258",
        rootCaseId: "7002",
        id: "140007",
        state: "ready",
        parentCaseId: "7002",
        last_update_date: "2024-01-27 15:50:38.258",
        assigned_id: "103"
    }
]

export default function TaskList() {
    const [mail, setMail] = useTask()

    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={cn(
                            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                            mail.selected === item.id && "bg-muted"
                        )}
                        onClick={() =>
                            setMail({
                                ...mail,
                                selected: item.id,
                            })
                        }
                    >
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <div className="font-semibold">{item.displayName}</div>
                                    {/*{!item.read && (*/}
                                    {/*    <span className="flex h-2 w-2 rounded-full bg-blue-600"/>*/}
                                    {/*)}*/}
                                </div>
                                <div
                                    className={cn(
                                        "ml-auto text-xs",
                                        mail.selected === item.id
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {formatDistanceToNow(new Date(item.assigned_date), {
                                        addSuffix: true,
                                    })}
                                </div>
                            </div>

                            {/** Process name */}
                            <div className="text-xs font-medium">
                                Process: {item.rootContainerId.displayName}
                            </div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                            {item.rootContainerId.displayDescription.substring(0, 300)}
                        </div>
                        {/*{item.labels.length ? (*/}
                        {/*    <div className="flex items-center gap-2">*/}
                        {/*        {item.labels.map((label) => (*/}
                        {/*            <Badge key={label} variant="default">*/}
                        {/*                {label}*/}
                        {/*            </Badge>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*) : null}*/}
                    </button>
                ))}
            </div>
        </ScrollArea>
    )
}