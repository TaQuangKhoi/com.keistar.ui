import {CommandGroup, CommandItem} from "@/components/ui/command";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CheckIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import * as React from "react";
import {useAtom} from "jotai/index";
import {isOpenTeamSwitcherAtom} from "@/app/workspace/atoms";

export default function PersonalTeam() {
    const [open, setOpen] = useAtom(isOpenTeamSwitcherAtom)

    return (<>
        {/*<CommandGroup key={group.label} heading={group.label}>*/}
        {/*    {group.teams.map((team) => (*/}
        {/*        <CommandItem*/}
        {/*            key={team.value}*/}
        {/*            onSelect={() => {*/}
        {/*                setSelectedTeam(team)*/}
        {/*                setTeam(team.value)*/}
        {/*                setOpen(false)*/}
        {/*                // go to dashboard*/}
        {/*                router.push('/workspace/dashboard')*/}
        {/*            }}*/}
        {/*            className="text-sm"*/}
        {/*        >*/}
        {/*            <Avatar className="mr-2 h-5 w-5">*/}
        {/*                <AvatarImage*/}
        {/*                    src={`https://avatar.vercel.sh/${team.value}.png`}*/}
        {/*                    alt={team.label}*/}
        {/*                    className="grayscale"*/}
        {/*                />*/}
        {/*                <AvatarFallback>SC</AvatarFallback>*/}
        {/*            </Avatar>*/}
        {/*            {*/}
        {/*                // if label too long, show first 10 characters*/}
        {/*                team.label.length > 10*/}
        {/*                    ? team.label.substring(0, 12) + "..."*/}
        {/*                    : team.label*/}
        {/*            }*/}
        {/*            <CheckIcon*/}
        {/*                className={cn(*/}
        {/*                    "ml-auto h-4 w-4",*/}
        {/*                    selectedTeam.value === team.value*/}
        {/*                        ? "opacity-100"*/}
        {/*                        : "opacity-0"*/}
        {/*                )}*/}
        {/*            />*/}
        {/*        </CommandItem>*/}
        {/*    ))}*/}
        {/*</CommandGroup>*/}
    </>);
}