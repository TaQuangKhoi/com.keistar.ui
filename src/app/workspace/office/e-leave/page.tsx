import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Calendar} from 'antd';

export default function E_leavePage() {
    return (
        <div>
            <Link href={'e-leave/new-e-leave'} className={cn(buttonVariants({variant: "default"}))}>
                New E-leave
            </Link>
            <Calendar/>
        </div>
    )
}