"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {toast} from "@/components/ui/use-toast";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import DatePickerWithRange from "@/app/cards/components/date-picker-with-range";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {RecentSales} from "@/app/workspace/components/recent-sales";

const newE_leaveFormSchema = z.object({
    leaveType: z
        .string({
            required_error: "Please select a leave type.",
        }),
    rememberMe: z.boolean().optional(),
    about: z.string().max(160).min(4),
})

type NewE_leaveFormValues = z.infer<typeof newE_leaveFormSchema>

const leaveTypes = [
    {value: "Sick Leave"},
    {value: "Maternity Leave"},
    {value: "Paternity Leave"},
    {value: "Marriage Leave"},
    {value: "Compassionate Leave"},
    {value: "Unpaid Leave"},
    {value: "Hospitalization Leave"},
    {value: "Child Care Leave"},
    {value: "Shared Parental Leave"},
    {value: "National Service Leave"},
    {value: "Others"},
]

const defaultValues: Partial<NewE_leaveFormValues> = {
    leaveType: leaveTypes[0].value,
    rememberMe: false,
}

export function NewE_leaveForm() {
    const form = useForm<NewE_leaveFormValues>({
        resolver: zodResolver(newE_leaveFormSchema), defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: NewE_leaveFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-2 space-y-8">
                    <div className="flex-row space-y-2">
                        <FormField
                            control={form.control}
                            name="leaveType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Leave Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a leave type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                leaveTypes.map((leaveType, index) => (
                                                    <SelectItem key={index} value={leaveType.value}>
                                                        {leaveType.value}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    {/*<FormDescription>*/}
                                    {/*    You can manage verified email addresses in your{" "}*/}
                                    {/*    <Link href="/examples/forms">email settings</Link>.*/}
                                    {/*</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Remember me
                                        </FormLabel>
                                        {/*<FormDescription>*/}
                                        {/*    You can manage your mobile notifications in the{" "}*/}
                                        {/*    <Link href="/examples/forms">mobile settings</Link> page.*/}
                                        {/*</FormDescription>*/}
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date" className="shrink-0">
                            Pick a date
                        </Label>
                        <DatePickerWithRange className="[&>button]:w-[260px]"/>
                    </div>
                    <FormField
                        control={form.control}
                        name="about"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Include comments for your approver"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                {/*<FormDescription>*/}
                                {/*    You can <span>@mention</span> other users and organizations to*/}
                                {/*    link to them.*/}
                                {/*</FormDescription>*/}
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Request Now</Button>
                </form>
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Your Request Includes</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentSales/>
                    </CardContent>
                </Card>
            </div>
        </Form>
    )
}