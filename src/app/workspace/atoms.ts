// Workspace atoms

import {atom} from "jotai";
import {atomsWithQuery} from 'jotai-tanstack-query'
import {sessionApiUrl} from "@/lib/api-enpoints";

const isOpenTeamSwitcherAtom = atom(false);
const isShowNewTeamDialogAtom = atom(false);

const userFullNameAtom = atom("Tôi Khôi");

const groupAtom = atom((get) => {
    let userFullName = get(userFullNameAtom);
    return [
        {
            label: "Personal Account",
            teams: [
                {
                    label: userFullName,
                    value: "personal",
                },
            ],
        },
        {
            label: "Teams",
            teams: [
                {
                    label: "R&D Department",
                    value: "r&d-department",
                },
                {
                    label: "HR Department",
                    value: "hr-department",
                },
                {
                    label: "Business Department",
                    value: "business-department",
                },
                {
                    label: "Finance Department",
                    value: "finance-department",
                },
                {
                    label: "GBS",
                    value: "gbs",
                },
                {
                    label: "IT Department",
                    value: "it-department",
                },
                {
                    label: "Marketing Department",
                    value: "marketing-department",
                },
                {
                    label: "Sales  Department",
                    value: "sales-department",
                },
            ],
        },
    ]
});
const selectedTeamAtom = atom({
    label: "Loading...",
    value: "personal",
});

const personalGroupAtom = atom((get) => {
    let userFullName = get(userNameAtom);
    return {
        label: "Personal Account",
        teams: [
            {
                label: userFullName,
                value: "personal",
            },
        ],
    }
})

const [userNameAtom] = atomsWithQuery((get) => ({
    queryKey: ['userName'],
    queryFn: async () => {
        const res = await fetch(sessionApiUrl, {
            credentials: "include",
            mode: 'cors',
        });
        const data = await res.json();
        return data.user_name
    },
}))

export {
    // Array
    groupAtom,

    // String
    userFullNameAtom,
    userNameAtom,

    // Boolean
    isOpenTeamSwitcherAtom,
    isShowNewTeamDialogAtom,

    // Object
    selectedTeamAtom,
    personalGroupAtom
};