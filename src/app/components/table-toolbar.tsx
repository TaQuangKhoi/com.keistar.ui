/**
 * v0 by Vercel.
 * @see https://v0.dev/t/D1BWQ67wd0N
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Button} from "@/components/ui/button"
import {Table} from "@tanstack/react-table";

export default function TableToolbar(
    {
        title,
        table,
    }: {
        title: string
        table: Table<unknown>
    }
) {
    const state = table.getState()

    return (
        <div key="1" className="flex items-center justify-between gap-4 p-4 border-b">
            <h2 className="text-lg font-semibold">
                {title}
            </h2>
            <div className="flex items-center gap-2">
                <Button size="sm"
                onClick={() => {
                }}
                >
                    <PlusIcon className="mr-2 h-4 w-4"/>
                    New Row
                </Button>
                <Button size="sm" variant="outline">
                    <TrashIcon className="mr-2 h-4 w-4"/>
                    Remove Row
                </Button>
            </div>
        </div>
    )
}

function PlusIcon(props: any) {
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
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
        </svg>
    )
}


function TrashIcon(props: any) {
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