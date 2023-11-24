'use client'

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {SignIn} from "@/app/authentication/components/sign-in";
import {CreateAccount} from "@/app/authentication/components/create-account";

export default function AuthBox() {
    const [isLoginMode, setIsLoginMode] = useState(true)

    console.log("AuthBox Render")

    function handleLogin() {
        setIsLoginMode(!isLoginMode)
    }

    return <>
        <Button variant={"ghost"}
                onClick={handleLogin}
                className={cn("absolute right-4 top-4 md:right-8 md:top-8")}>
            {
                isLoginMode ? "Create an account" : "Sign in"
            }
        </Button>
        {
            isLoginMode ? <SignIn/> : <CreateAccount/>
        }
    </>
}