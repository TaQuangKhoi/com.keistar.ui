/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NCWFAGHNyPr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import {ReactNode} from "react";

export default function KeistarLayout(
    title: string,
    toolbar: ReactNode,
    left_sidebar: ReactNode,
    fragment: ReactNode
) {
    return (
        <div key="1" className="bg-white p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            {toolbar}
            <div className="grid grid-flow-row-dense grid-cols-4 gap-4 mt-2">
                <div className="">
                    {left_sidebar}
                </div>
                <div className="col-span-3">
                    {fragment}
                </div>
            </div>
        </div>
    )
}