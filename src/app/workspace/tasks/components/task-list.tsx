import {ScrollArea} from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {Badge} from "@/components/ui/badge";
import { faker } from '@faker-js/faker';
import {useTask} from "@/app/workspace/tasks/use-task";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import {ProcessDefinition} from "@/bonita/api/bpm/archived-process-instance/types";

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