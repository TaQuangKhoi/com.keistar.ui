import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import ProcessFormShell from "@/app/workspace/tasks/components/process-form-shell";

export interface ProcessFormInputType {
    key: string,
    value: string | number | null | undefined,
    type?: string
}

interface ProcessFormInputProps {
    data: ProcessFormInputType[]
}

export default function ProcessFormInput(
    {
        data
    }: ProcessFormInputProps
) {

    return (
        <ProcessFormShell>
            {
                data.map((item: ProcessFormInputType) => {
                    return (
                        <div className="my-2"
                             key={item.key}>
                            <Label>
                                {item.key}
                            </Label>
                            {
                                item.type === "textarea" ? (
                                    <Textarea
                                        className="mt-1"
                                        value={item?.value as string}
                                        readOnly
                                    />
                                ) : (
                                    <Input className="mt-1"
                                           value={item.value as string}
                                           readOnly
                                    />
                                )
                            }
                        </div>
                    )
                })
            }
        </ProcessFormShell>
    )
}