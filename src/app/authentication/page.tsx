'use client'
import {Metadata} from "next"

import {cn} from "@/lib/utils"
import {Button, buttonVariants} from "@/components/ui/button"
import {CreateAccount} from "@/app/authentication/components/create-account";
import {useState} from "react";
import {SignIn} from "@/app/authentication/components/sign-in";

// export const metadata: Metadata = {
//     title: "Authentication",
//     description: "Authentication forms built using the components.",
// }

export default function AuthenticationPage() {
    const [isLoginMode, setIsLoginMode] = useState(true)

    console.log("AuthenticationPage Render")

    function handleLogin() {
        setIsLoginMode(!isLoginMode)
    }

    return (
        <>
            <div
                className="min-h-screen flex-col items-center justify-center md:grid lg:grid-cols-2 lg:p-0">
                <Button variant={"ghost"}
                        onClick={handleLogin}
                        className={cn("absolute right-4 top-4 md:right-8 md:top-8")}>
                    {
                        isLoginMode ? "Create an account" : "Sign in"
                    }
                </Button>
                <div className="relative hidden lg:h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900"/>
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
                        HavakoBPM
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Nhưng sự thật chứng minh, không phải mỗi một phần chân thành tha thiết tình cảm
                                đều sẽ đạt được đáp lại, trên thế giới cũng thật sự có tan không ra băng cứng.&rdquo;
                            </p>
                            <footer className="text-sm">Tạ Quang Khôi</footer>
                        </blockquote>
                    </div>
                </div>
                {
                    isLoginMode ? <SignIn/> : <CreateAccount/>
                }
            </div>
        </>
    )
}
