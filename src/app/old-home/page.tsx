import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default function Home() {
    let className = cn(buttonVariants({variant: "default"}), "m-2");
    return (
        <>
            <Link href={"/workspace/dashboard"} className={className}>
                Workspace
            </Link>
            <Link href={"/authentication"} className={className}>
                Login
            </Link>
            <Link href={"/examples"} className={className}>
                Example
            </Link>
        </>
    )
}
