'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pPtUp5olwIJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Input} from "@/components/ui/input"
import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import {useWindowSize} from "@uidotdev/usehooks";
import {clsx} from "clsx";
import React from "react";

export default function KeistarLeftSidebar(
    props: {
        selected: any,
        list: any,
        cardConfig: any,
        onClick: any
    }
) {
    // const windowsSize = useWindowSize();
    //
    // let maxH: number = 0;
    // if (windowsSize.width !== null && windowsSize.height !== null) {
    //     maxH = windowsSize.height - 200;
    // }
    //
    // let style = clsx(
    //     "border",
    //     "rounded-md",
    //     "max-h-screen",
    //     "overflow-auto",
    //     maxH > 0 ? `max-h-${maxH}` : ""
    // )

    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
                <Input className="flex items-center mb-4" placeholder="Search..."/>
                <ScrollArea className="border rounded-md max-h-screen overflow-auto">
                    <div className="p-4 space-y-4">
                        {
                            props.list.map((item: any, index: number) => {
                                return <>
                                    <Card className={clsx("bg-gray-100 transition-transform hover:scale-105",
                                        props.selected.ID === item.ID ? "ring-2 ring-blue-500" : "")}
                                          onClick={() => props.onClick(item)}
                                    >
                                        <CardHeader>
                                            <CardTitle>TT-VT-OT-0001109</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>
                                                <strong>Approver:</strong>
                                                {item.approver}
                                            </p>
                                            <p>
                                                <strong>Status:</strong>
                                                {item.status}
                                            </p>
                                            <p>
                                                <strong>From:</strong>
                                                {item.from}
                                            </p>
                                            <p>
                                                <strong>To:</strong>
                                                {item.to}
                                            </p>
                                            <p>
                                                <strong>Total hours:</strong>
                                                {item.total_hours}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </>
                            })
                        }

                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

// === styles.css ===
//
// body {
//     font-family: var(--font-inter), sans-serif;
// }
//
// h1, h2, h3, h4, h5, h6 {
//     font-family: var(--font-inter), sans-serif;
// }
//
// === layout.jsx ===

// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

// import { Inter } from 'next/font/google'
// import { Inter } from 'next/font/google'
// import './styles.css'
//
// const inter = Inter({
//     subsets: ['latin'],
//     display: 'swap',
//     variable: '--font-inter',
// })
// const inter = Inter({
//     subsets: ['latin'],
//     display: 'swap',
//     variable: '--font-inter',
// })
//
// export default function Layout({ children }) {
//     return (
//         <html lang="en">
//         <body className={inter.variable + inter.variable}>
//         {children}
//         </body>
//         </html>
//     )
// }