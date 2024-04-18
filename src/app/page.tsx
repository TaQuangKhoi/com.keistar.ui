/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yq2AQXXa2K0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import ButtonForEnterApp from "@/app/components/button-for-enter-app";

export default function Component() {
    return (
        <div key="1" className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="py-6 px-4 md:px-6 bg-white dark:bg-gray-800 shadow">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">Keistar BPM</div>
                    <button className="md:hidden" onClick={undefined}>
                        <MenuIcon className="h-6 w-6"/>
                    </button>
                    <nav className="space-x-4 hidden md:block">
                        <Link className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                              href="#">
                            About
                        </Link>
                        <Link className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                              href="#">
                            Features
                        </Link>
                        <Link className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                              href="#">
                            Pricing
                        </Link>
                        <Link className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                              href="#">
                            Contact
                        </Link>
                        <ButtonForEnterApp/>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <section className="py-12 md:py-24 bg-gray-100 dark:bg-gray-800">
                    <div className="container mx-auto px-4 md:px-6 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                            Common Process Pain Points
                        </h2>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                            <li>Inefficient workflows that waste time and resources</li>
                            <li>Lack of visibility into processes, making it hard to identify bottlenecks</li>
                            <li>Manual data entry errors that lead to inaccurate results</li>
                            <li>Difficulty in tracking progress and meeting deadlines</li>
                        </ul>
                    </div>
                </section>
                <section className="py-12 md:py-24 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-4 md:px-6 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">Keistar BPM
                            Solutions</h2>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                            <li>Automated workflows that streamline processes and improve efficiency</li>
                            <li>Real-time process tracking for better visibility and control</li>
                            <li>Data validation to prevent errors and ensure accuracy</li>
                            <li>Integration capabilities with existing systems for seamless operations</li>
                        </ul>
                    </div>
                </section>
                <section className="py-12 md:py-24 bg-gray-100 dark:bg-gray-800">
                    <div className="container mx-auto px-4 md:px-6 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">User
                            Benefits</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col items-center text-center">
                                <ActivityIcon className="h-12 w-12 text-gray-800 dark:text-gray-200"/>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Boosted productivity</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <SaveIcon className="h-12 w-12 text-gray-800 dark:text-gray-200"/>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Significant cost savings</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <OptionIcon className="h-12 w-12 text-gray-800 dark:text-gray-200"/>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Improved decision-making</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <WorkflowIcon className="h-12 w-12 text-gray-800 dark:text-gray-200"/>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">Streamlined processes</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="py-6 px-4 md:px-6 bg-white dark:bg-gray-800 shadow-inner">
                <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
                    © 2024 Keistar BPM. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

function ActivityIcon(props: any) {
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
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
    )
}

function MenuIcon(props: any) {
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
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
    )
}

function OptionIcon(props: any) {
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
            <path d="M3 3h6l6 18h6"/>
            <path d="M14 3h7"/>
        </svg>
    )
}

function SaveIcon(props: any) {
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
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
        </svg>
    )
}

function WorkflowIcon(props: any) {
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
            <rect width="8" height="8" x="3" y="3" rx="2"/>
            <path d="M7 11v4a2 2 0 0 0 2 2h4"/>
            <rect width="8" height="8" x="13" y="13" rx="2"/>
        </svg>
    )
}
