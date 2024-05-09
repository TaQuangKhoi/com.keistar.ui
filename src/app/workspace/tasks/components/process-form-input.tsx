import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useWindowSize} from "@uidotdev/usehooks";

export interface ProcessFormInput {
    key: string,
    value: string | number | null | undefined,
    type?: string
}

interface ProcessFormInputProps {
    data: ProcessFormInput[]
}

export default function ProcessFormInput(
    {
        data
    }: ProcessFormInputProps
) {
    const [height, setHeight] = useState<number>(0);
    const windowsSize = useWindowSize();
    /**
     * Dynamic height
     */
    useEffect(() => {
        if (windowsSize.height === null) {
            return;
        }
        let newHeight = 0;
        if (windowsSize.height >= 774) {
            newHeight = windowsSize.height - 390;
            setHeight(newHeight);
        }
        if (windowsSize.height < 774) {
            newHeight = windowsSize.height - 400;
        }
        setHeight(newHeight);
    }, [windowsSize]);

    return (
        <div className="flex-1 whitespace-pre-wrap p-4 text-sm overflow-auto"
             style={
                 {maxHeight: height}
             }
        >
            {
                data.map((item: ProcessFormInput) => {
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
        </div>
    )
}