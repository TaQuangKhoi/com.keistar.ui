import {ScrollArea} from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {Badge} from "@/components/ui/badge";
import {useTask} from "@/app/workspace/tasks/use-task";
import {items} from "@/app/workspace/tasks/components/task";

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