import {atom} from 'jotai'
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";

export const tasksAtom = atom<FullHumanTask[]>([])