import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default function ExamplePage() {
    let className = cn(buttonVariants({variant: "default"}), "m-2");
    return (
        <>
            <Link href={"/examples/authentication"} className={className}>
                Authentication
            </Link>
            <Link href={"/examples/tasks"} className={className}>
                Tasks
            </Link>
            <Link href={"/examples/playground"} className={className}>
                Playground
            </Link>
            <Link href={"/examples/cards"} className={className}>
                Cards
            </Link>
            <Link href={"/examples/forms"} className={className}>
                Forms
            </Link>
            <Link href={"/examples/music"} className={className}>
                Music
            </Link>
            <Link href={"/examples/mail"} className={className}>
                Mail
            </Link>
        </>
    )
}
