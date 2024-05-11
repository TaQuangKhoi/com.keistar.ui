import {useGetContextByUserTaskId} from "@/bonita/api/bpm/user-task/definitions/finds-context-by-user-task-id";
import {PrimitiveAtom, useAtom} from "jotai/index";
import callLink from "@/bonita/api/bdm/call-link";
import {useEffect} from "react";

export default function useFormItem(
    {
        taskId,
        selectedItemAtom,
        refName,
    }: {
        taskId: string;
        selectedItemAtom: PrimitiveAtom<any>;
        refName: string;
    }
) {
    const [context, ,] = useGetContextByUserTaskId(taskId);
    const [, setSelectedItem] = useAtom(selectedItemAtom);
    const getData = async () => {
        const data = await callLink(context[refName].link)
        setSelectedItem(data)
    }
    useEffect(() => {
        if (context != undefined) {
            getData()
        }
    }, [context]);
}