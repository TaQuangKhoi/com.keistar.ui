import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function Home() {
  return (
    <>
        <Link href={"/authentication"} className={buttonVariants({ variant: "ghost" })}>
            Authentication
        </Link>
        <Link href={"/tasks"} className={buttonVariants({ variant: "ghost" })}>
            Tasks
        </Link>
    </>
  )
}
