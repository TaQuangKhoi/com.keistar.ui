import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default function Home() {

    let className = cn(buttonVariants({variant: "default"}), "m-2");
    return (
        <>
            <Link href={"/dashboard"} className={className}>
                Dashboard
            </Link>
            <Link href={"/authentication"} className={className}>
                Authentication
            </Link>
            <Link href={"/tasks"} className={className}>
                Tasks
            </Link>
            <Link href={"/playground"} className={className}>
                Playground
            </Link>
            <Link href={"/cards"} className={className}>
                Cards
            </Link>
            <Link href={"/forms"} className={className}>
                Forms
            </Link>
        </>
    )
}
