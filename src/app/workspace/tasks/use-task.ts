import { atom, useAtom } from "jotai"

type TaskConfig = {
    selected: number | null;
}

const taskConfigAtom = atom<TaskConfig>({
    selected: null,
})

export function useTask() {
    return useAtom(taskConfigAtom)
}