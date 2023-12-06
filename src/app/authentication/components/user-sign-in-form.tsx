"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast"
import {isLogin, useBonitaSession} from "@/lib/bonita_api_utils";

interface UserSignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
}


export function UserSignInForm({className, ...props}: UserSignInFormProps) {
    const { session, isSessionLoading, isError } = useBonitaSession()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()

    if (isSessionLoading) {
        return <div>Loading...</div>
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        const username = (event.target as any).username.value
        const password = (event.target as any).password.value

        const res = await fetch('http://localhost:28071/bonita/loginservice', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: `username=${username}&password=${password}&redirect=false&redirectURL=`,
            mode: 'cors',
            credentials: "include",
        })

        console.log(res.ok)

        // redirect to dashboard
        if (res.ok && session) {
            setIsLoading(false)
            router.push("/workspace/dashboard")
        } else {
            toast({
                title: "Error",
                description: (
                    "Hảo, có lỗi xảy ra, vui lòng thử lại sau."
                ),
            })
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="Enter your username"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="Enter your password"
                            type="password"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4"/>
                )}{" "}
                Github
            </Button>
        </div>
    )
}
