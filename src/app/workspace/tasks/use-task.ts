import { atom, useAtom } from "jotai"
import {HumanTask} from "@/bonita/api/bpm/human-task/types";

type TaskConfig = {
    selected: HumanTask["id"] | null;
}

const taskConfigAtom = atom<TaskConfig>({
    selected: null,
})

/**
 * The hook to returns the selected task
 */
export function useTask() {
    return useAtom(taskConfigAtom)
}