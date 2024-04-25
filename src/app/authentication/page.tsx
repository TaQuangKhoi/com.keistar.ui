import {Metadata} from "next"
import AuthBox from "@/app/authentication/components/auth-box";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
    return (
        <>
            <div
                className="min-h-screen flex-col items-center justify-center md:grid lg:grid-cols-2 lg:p-0">
                <div className="relative hidden lg:h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900">
                        {/*<Image src='' alt="" fill={true} style={{objectFit: "cover"}}/>*/}
                    </div>
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
                        </svg>
                        KeistarBPM
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify the inefficiency.&rdquo;
                            </p>
                            <footer className="text-sm">
                                Bill Gates
                            </footer>
                        </blockquote>
                    </div>
                </div>
                <AuthBox/>
            </div>
        </>
    )
}
