// Workspace atoms

import {atom} from "jotai";

const isOpenTeamSwitcherAtom = atom(false);
const isShowNewTeamDialogAtom = atom(false);

const userFullNameAtom = atom("Hảo Văn 2");

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
    label: "Personal Account",
    teams: [
        {
            label: "Hảo Văn 2",
            value: "personal",
        },
    ],
})

export {
    // Array
    groupAtom,

    // String
    userFullNameAtom,

    // Boolean
    isOpenTeamSwitcherAtom,
    isShowNewTeamDialogAtom,

    // Object
    selectedTeamAtom,
};