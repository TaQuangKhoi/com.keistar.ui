import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import React, {useState} from "react";

interface ButtonConfig {
    label: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>, comment: string) => void,
}

interface TaskSubmitFooterProps {
    task: FullHumanTask,
    buttons: ButtonConfig[],
}

export default function TaskSubmitFooter(
    {task, buttons}: TaskSubmitFooterProps
) {
    const [comment, setComment] = useState<string>("");

    return (
        <div className="p-4">
            <form>
                <div className="grid gap-4">
                    <Textarea
                        className="p-4"
                        placeholder={`Comment for ${task.name}...`}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex items-center">
                        {/*<Label*/}
                        {/*    htmlFor="mute"*/}
                        {/*    className="flex items-center gap-2 text-xs font-normal"*/}
                        {/*>*/}
                        {/*    <Switch id="mute" aria-label="Mute thread"/>*/}
                        {/*    Mute this thread*/}
                        {/*</Label>*/}
                        <div className="flex ml-auto space-x-2">
                            {
                                buttons.map((button, index) => (
                                    <Button
                                        key={index}
                                        onClick={(e) => button.onClick(e, "Chờ Em Tan Học")}
                                        size="sm"
                                    >
                                        {button.label}
                                    </Button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}