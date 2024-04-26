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
import React, {useEffect, useState} from "react";
import {PrimitiveAtom, useAtom} from "jotai/index";

export default function KeistarLeftSidebar(
    {
        idKey,
        selected,
        list,
        cardConfig,
        titleKey,
    }: {
        idKey: string,
        selected: PrimitiveAtom<any>
        list: any,
        cardConfig: any,
        titleKey: string,
    }
) {
    const windowsSize = useWindowSize();
    const [height, setHeight] = useState<number>()
    const [selectedItem, setSelectedItem] = useAtom(selected);

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

    useEffect(() => {
        if (windowsSize.height === null) {
            return;
        }
        const newHeight = windowsSize.height - 300;
        setHeight(newHeight);
    }, [windowsSize]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
                <Input className="flex items-center mb-4" placeholder="Search..."/>
                <ScrollArea className="border rounded-md max-h-screen overflow-auto"
                            style={{maxHeight: height}}
                >
                    <div className="p-4 space-y-4">
                        {
                            list === undefined &&
                            <p>Loading...</p>
                        }
                        {
                            list !== undefined &&
                            list.map((item: any, index: number) => {
                                return <>
                                    <Card className={clsx("bg-gray-100 transition-transform hover:scale-105",
                                        selectedItem[idKey] === item[idKey]
                                            ? "ring-2 ring-blue-500" : "")}
                                          onClick={() => {
                                              setSelectedItem(item);
                                          }}
                                    >
                                        <CardHeader>
                                            <CardTitle>
                                                {item[titleKey]}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {
                                                cardConfig.map((config: any) => {
                                                    return <p key={config.key}>
                                                        <strong>{config.label}:</strong>
                                                        {item[config.key]}
                                                    </p>
                                                })
                                            }
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