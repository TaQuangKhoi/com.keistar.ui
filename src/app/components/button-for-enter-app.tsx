'use client'

import Link from "next/link";
import {useSession} from "@/bonita/api/system/get-the-current-user-session";

export default function ButtonForEnterApp() {
    const [session, loadingSession, errorSession] = useSession();

    function getHrefForButtonEnterApp() {
        if (session.user_id === undefined) {
            return "/authentication";
        }
        return "/workspace/dashboard";
    }

    function getTextForButtonEnterApp() {
        if (session.user_id === undefined) {
            return "Login";
        }
        return "Workspace";
    }

    return <>
        <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href={getHrefForButtonEnterApp()}
        >
            {getTextForButtonEnterApp()}
        </Link>
    </>
}