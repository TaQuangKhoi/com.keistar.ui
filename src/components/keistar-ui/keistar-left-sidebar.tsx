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
import {Icons} from "@/components/icons";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import {WritableAtom} from "jotai";

export default function KeistarLeftSidebar(
    {
        idKey,
        selectedAtom,
        listAtom,
        reloadListAtom,
        cardConfig,
        titleKey,
    }: {
        idKey: string,
        selectedAtom: PrimitiveAtom<any>,
        listAtom: PrimitiveAtom<any[]>,
        reloadListAtom: WritableAtom<boolean, [boolean?], void>,
        cardConfig: {
            businessDataType: string,
            businessData: {
                query: string,
                params: any,
            },
            header: {
                label: string,
                key: string,
            }[],
        },
        titleKey: string,
    }
) {
    const [height, setHeight] = useState<number>()
    const windowsSize = useWindowSize();
    /**
     * Dynamic height
     */
    useEffect(() => {
        if (windowsSize.height === null) {
            return;
        }
        const newHeight = windowsSize.height - 300;
        setHeight(newHeight);
    }, [windowsSize]);


    const [selectedItem, setSelectedItem] = useAtom(selectedAtom);


    const [reloadList, toggle] = useAtom(reloadListAtom);

    const [listState, setListState] = useAtom(listAtom);
    const getData = async () => {
        const _list = await findsBusinessData(
            cardConfig.businessDataType,
            cardConfig.businessData.query ? cardConfig.businessData.query : "findsOrderByUpdatedDate",
            0, 20, {}, 'directManager',
            cardConfig.businessData.params
        )
        setListState(_list);
    };
    useEffect(() => {
        if (reloadList) {
            toggle(false);
            getData();
        }
    }, [reloadList]);
    /**
     * Default selected item
     */
    useEffect(() => {
        if (listState) {
            setSelectedItem(listState[0]);
        }
    }, [listState]);


    /**
     * Sync Data
     */
    useEffect(() => {
        const interval = setInterval(() => {
            // getData();
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
                <Input className="flex items-center mb-4" placeholder="Search..."/>
                <div className="border rounded-md" style={{height: height}}>
                    {
                        (
                            listState === undefined &&
                            <div className="flex items-center justify-center h-full">
                                <p>
                                    <Icons.spinner className="mr-2 h-14 w-14 animate-spin"/>
                                </p>
                            </div>
                        ) ||
                        (
                            listState !== undefined && listState.length === 0 &&
                            <div className="flex items-center justify-center h-full">
                                <p>No data found</p>
                            </div>
                        ) ||
                        (
                            listState !== undefined && listState.length > 0 &&
                            <ScrollArea className="overflow-auto" style={{height: height}}
                            >
                                <div className="p-4 space-y-4">
                                    {
                                        listState.map((item: any, index: number) => {
                                            return <>
                                                <Card
                                                    className={clsx("bg-gray-100 transition-transform hover:scale-105",
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
                                                            cardConfig.header.map((config: any) => {
                                                                if (config.key.includes("(")) {
                                                                    const keys = config.key.split("(");
                                                                    const type = keys[1].replace(")", "");
                                                                    switch (type) {
                                                                        case "Date":
                                                                            if (item[keys[0]] !== null && item[keys[0]] !== undefined) {
                                                                                return <>
                                                                                    <p key={config.key}>
                                                                                        <strong>{config.label}: </strong>
                                                                                        {
                                                                                            new Date(item[keys[0]]).toLocaleDateString()
                                                                                        }
                                                                                    </p>
                                                                                </>
                                                                            }
                                                                    }
                                                                }
                                                                if (config.key.includes(".")) {
                                                                    const keys = config.key.split(".");
                                                                    if (item[keys[0]] !== null && item[keys[0]] !== undefined) {
                                                                        return <>
                                                                            <p key={config.key}>
                                                                                <strong>{config.label}: </strong>
                                                                                {
                                                                                    item[keys[0]][keys[1]]
                                                                                }
                                                                            </p>
                                                                        </>
                                                                    }
                                                                }
                                                                return <>
                                                                    <p key={config.key}>
                                                                        <strong>{config.label}: </strong>
                                                                        {
                                                                            item[config.key] !== null || item[config.key] !== undefined ? item[config.key] : "N/A"
                                                                        }
                                                                    </p>
                                                                </>
                                                            })
                                                        }
                                                    </CardContent>
                                                </Card>
                                            </>
                                        })
                                    }
                                </div>
                            </ScrollArea>
                        )
                    }
                </div>
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