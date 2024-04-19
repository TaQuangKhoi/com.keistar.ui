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

export default function KeistarLeftSidebar() {
    const windowsSize = useWindowSize();

    let maxH: number = 0;
    if (windowsSize.width !== null && windowsSize.height !== null) {
        maxH = windowsSize.height - 200;
    }

    let style = clsx(
        "border",
        "rounded-md",
        "max-h-screen",
        "overflow-auto",
        maxH > 0 ? `max-h-${maxH}` : ""
    )

    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
                <Input className="flex items-center mb-4" placeholder="Search..."/>
                <ScrollArea className="border rounded-md max-h-screen overflow-auto">
                    <div className="p-4 space-y-4">
                        <Card className="bg-gray-100 ring-2 ring-blue-500 transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle>TT-VT-OT-0001109</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Approver:</strong>
                                    Vu Nguyen Quang Phap
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    OT waiting for approve
                                </p>
                                <p>
                                    <strong>From:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>To:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>Total hours:</strong>
                                    8.00
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-100 transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle>TT-VT-OT-0001109</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Approver:</strong>
                                    Vu Nguyen Quang Phap
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    OT waiting for approve
                                </p>
                                <p>
                                    <strong>From:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>To:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>Total hours:</strong>
                                    8.00
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-100 transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle>TT-VT-OT-0001108</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Approver:</strong>
                                    Vu Nguyen Quang Phap
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    OT waiting for approve
                                </p>
                                <p>
                                    <strong>From:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>To:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>Total hours:</strong>
                                    8.00
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-100 transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle>TT-VT-OT-0001108</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Approver:</strong>
                                    Vu Nguyen Quang Phap
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    OT waiting for approve
                                </p>
                                <p>
                                    <strong>From:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>To:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>Total hours:</strong>
                                    8.00
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-100 transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle>TT-VT-OT-0001108</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Approver:</strong>
                                    Vu Nguyen Quang Phap
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    OT waiting for approve
                                </p>
                                <p>
                                    <strong>From:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>To:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>Total hours:</strong>
                                    8.00
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gray-100 transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle>TT-VT-OT-0001107</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Approver:</strong>
                                    Vu Nguyen Quang Phap
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    Approved
                                </p>
                                <p>
                                    <strong>From:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>To:</strong>
                                    2/4/2024
                                </p>
                                <p>
                                    <strong>Total hours:</strong>
                                    8.00
                                </p>
                            </CardContent>
                        </Card>
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