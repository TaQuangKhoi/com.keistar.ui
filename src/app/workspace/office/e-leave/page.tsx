import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default function E_leavePage() {
    return (
        <div>
            <h1>E-Leave - Coming soon</h1>
            <Link href={'e-leave/new-e-leave'} className={cn(buttonVariants({variant: "default"}))}>
                New E-leave
            </Link>
        </div>
    )
}