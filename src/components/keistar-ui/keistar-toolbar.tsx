/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FLCtgLNBgt6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Button} from "@/components/ui/button"
import * as React from "react";

export default function KeistarToolbar() {
    return (
        <div key="1" className="flex flex-wrap gap-2 bg-white p-4 shadow">
            <Button className="space-x-1.5 border hover:text-blue-500 transition-transform active:scale-95"
                    variant="outline">
                <HardDriveIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Save</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <FileIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>New</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <XIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Cancel</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <TrashIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Delete</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <ChevronLeftIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Previous</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <ChevronRightIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Next</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <FilesIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Copy</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <ArrowLeftCircleIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Refresh</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <PrinterIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Print</span>
            </Button>
            <Button className="space-x-1.5 hover:text-blue-500 transition-transform active:scale-95" variant="outline">
                <SplitIcon className="h-5 w-5 hover:text-blue-500"/>
                <span>Split</span>
            </Button>
        </div>
    )
}

function ArrowLeftCircleIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <path d="M16 12H8"/>
            <path d="m12 8-4 4 4 4"/>
        </svg>
    )
}


function ChevronLeftIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6"/>
        </svg>
    )
}


function ChevronRightIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6"/>
        </svg>
    )
}


function FileIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
        </svg>
    )
}


function FilesIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"/>
            <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"/>
            <path d="M15 2v5h5"/>
        </svg>
    )
}


function HardDriveIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="22" x2="2" y1="12" y2="12"/>
            <path
                d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            <line x1="6" x2="6.01" y1="16" y2="16"/>
            <line x1="10" x2="10.01" y1="16" y2="16"/>
        </svg>
    )
}


function PrinterIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect width="12" height="8" x="6" y="14"/>
        </svg>
    )
}


function SplitIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 3h5v5"/>
            <path d="M8 3H3v5"/>
            <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/>
            <path d="m15 9 6-6"/>
        </svg>
    )
}


function TrashIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
    )
}


function XIcon(props: React.HTMLAttributes<any>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}