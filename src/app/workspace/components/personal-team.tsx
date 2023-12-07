import {CommandGroup, CommandItem} from "@/components/ui/command";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CheckIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import * as React from "react";
import {useAtom} from "jotai/index";
import {isOpenTeamSwitcherAtom, selectedTeamAtom} from "@/app/workspace/atoms";
import {useRouter} from "next/navigation";
import {useBonitaSession} from "@/lib/bonita_api_swr_utils";

const personalGroup = {
    label: "Personal",
    teams: [
        {label: "Personal", value: "personal"},
    ],
}

export default function PersonalTeam() {
    const [open, setOpen] = useAtom(isOpenTeamSwitcherAtom)
    const [selectedTeam, setSelectedTeam] = useAtom(selectedTeamAtom)
    const router = useRouter()
    const {session, isSessionLoading, isError} = useBonitaSession()

    return (<>
        <CommandGroup key={personalGroup.label} heading={personalGroup.label}>
            {personalGroup.teams.map((team) => (
                <CommandItem
                    key={team.value}
                    onSelect={() => {
                        setSelectedTeam(team)
                        // setTeam(team.value)
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
                        <AvatarFallback>HV</AvatarFallback>
                    </Avatar>
                    {
                        // if label too long, show first 10 characters
                        team.label.length > 10
                            ? isSessionLoading ? 'Loading...' : session?.user_name?.substring(0, 10)
                            : isSessionLoading ? 'Loading...' : session?.user_name
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
    </>);
}