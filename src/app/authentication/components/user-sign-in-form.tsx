"use client"

import * as React from "react"
import {useCallback, useEffect} from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast"
import {getCurrentUserSession} from "@/bonita/api/system/get-the-current-user-session";
import {store} from "@/app/valtio-proxy";
import {useSnapshot} from "valtio";
import {login} from "@/bonita/api/authentication/portal-authentication";

interface UserSignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
}


export function UserSignInForm({className, ...props}: UserSignInFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()

    const snap = useSnapshot(store)

    /**
     * Handle submit form
     */
    const onSubmit = useCallback(async (event: React.SyntheticEvent) => {
        event.preventDefault()
        setIsLoading(true)
        const username = (event.target as any).username.value
        const password = (event.target as any).password.value

        let res = await login(username, password);

        if (res.status === 204) {
            router.push('/workspace/dashboard');
        } else {
            toast({
                title: "Error",
                description: (
                    "Có lỗi xảy ra, vui lòng thử lại sau."
                ),
            })
            setIsLoading(false)
        }
    }, [])

    async function isLogin() {
        const currentUser = await getCurrentUserSession();
        if (currentUser.status === 200) {
            // redirect to dashboard
            router.push('/workspace/dashboard');
        }
    }


    /**
     * Check if user is logged in
     */
    useEffect(() => {
        isLogin();
    }, [])


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
