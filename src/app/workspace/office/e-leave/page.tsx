import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import E_leaveCalendar from "@/app/workspace/office/e-leave/components/e-leave-calendar";


export default function E_leavePage() {
    return (
        <div className="mx-4 mt-3">
            <Link href={'e-leave/new-e-leave'} className={cn(buttonVariants({variant: "default"}))}>
                New E-leave
            </Link>
            <E_leaveCalendar/>
        </div>
    )
}