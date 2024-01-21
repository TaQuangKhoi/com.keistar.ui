import {atom, useAtom, useAtomValue} from "jotai/index";

type Team = {
    label: string,
    value: string,
}

const selectedTeamAtom = atom<Team>({
    label: "Loading...",
    value: "personal",
});

export function useSelectedTeam() {
    return useAtom(selectedTeamAtom);
}

export function useSelectedTeamValue() {
    return useAtomValue(selectedTeamAtom);
}