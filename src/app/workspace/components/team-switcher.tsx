"use client"

import * as React from "react"
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useRouter} from 'next/navigation'
import {useAtom} from "jotai";
import {useEffect, useState} from "react";
import {
    isOpenTeamSwitcherAtom,
    isShowNewTeamDialogAtom, personalGroupAtom, userNameAtom,
} from "@/app/workspace/atoms";
import PersonalTeam from "@/app/workspace/components/personal-team";
import {useSelectedTeam} from "@/app/workspace/hooks/use-selected-team";
import {useSession} from "@/bonita/api/system/get-the-current-user-session";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {
}

function getGroup(userFullName: string) {
    return [
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
}


export default function TeamSwitcher({className}: TeamSwitcherProps) {
    const router = useRouter();
    const [, setUserName] = useAtom(userNameAtom)

    const [session, loadingSession, errorSession] = useSession()

    const [groups, setGroups] = useState(getGroup("No Name"));


    const [open, setOpen] = useAtom(isOpenTeamSwitcherAtom)
    const [showNewTeamDialog, setShowNewTeamDialog] = useAtom(isShowNewTeamDialogAtom)
    const [defaultTeam] = useAtom(personalGroupAtom)
    const [selectedTeam, setSelectedTeam] = useSelectedTeam()

    /**
     * Run if any deps change
     */
    useEffect(() => {
        if (loadingSession) {
            return
        }
        if (errorSession) {
            router.push("/authentication")
            return
        }
        if (session) {
            setUserName(session.user_name)
            setSelectedTeam(defaultTeam.teams[0])
        }
    }, [loadingSession, errorSession, session, defaultTeam])

    return (
        <>
            <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            aria-label="Select a team"
                            className={cn("min-w-[200px] justify-between", className)}
                        >
                            <Avatar className="mr-2 h-5 w-5">
                                <AvatarImage
                                    src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                                    alt={selectedTeam.label}
                                />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            {selectedTeam.label}
                            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandList>
                                <CommandInput placeholder="Search team..."/>
                                <CommandEmpty>No team found.</CommandEmpty>

                                <PersonalTeam/>

                                {groups.map((group) => (
                                    <CommandGroup key={group.label} heading={group.label}>
                                        {group.teams.map((team) => (
                                            <CommandItem
                                                key={team.value}
                                                onSelect={() => {
                                                    setSelectedTeam(team)
                                                    setOpen(false)
                                                    router.push('/workspace/dashboard')
                                                }}
                                                className="text-sm"
                                            >
                                                <Avatar className="mr-2 h-5 w-5">
                                                    <AvatarImage
                                                        src={`https://avatar.vercel.sh/${team.value}.png`}
                                                        alt={team.label}
                                                        className="grayscale"
                                                    />
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                {
                                                    // if label too long, show first 10 characters
                                                    team.label.length > 10
                                                        ? team.label.substring(0, 12) + "..."
                                                        : team.label
                                                }
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        selectedTeam.value === team.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                ))}
                            </CommandList>
                            <CommandSeparator/>
                            <CommandList>
                                <CommandGroup>
                                    <DialogTrigger asChild>
                                        <CommandItem
                                            onSelect={() => {
                                                setOpen(false)
                                                setShowNewTeamDialog(true)
                                            }}
                                        >
                                            <PlusCircledIcon className="mr-2 h-5 w-5"/>
                                            Create Team
                                        </CommandItem>
                                    </DialogTrigger>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create team</DialogTitle>
                        <DialogDescription>
                            Add a new team to manage products and customers.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div className="space-y-4 py-2 pb-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Team name</Label>
                                <Input id="name" placeholder="Acme Inc."/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="plan">Subscription plan</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a plan"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="free">
                                            <span className="font-medium">Free</span> -{" "}
                                            <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                                        </SelectItem>
                                        <SelectItem value="pro">
                                            <span className="font-medium">Pro</span> -{" "}
                                            <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
