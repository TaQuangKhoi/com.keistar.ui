"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useFieldArray, useForm} from "react-hook-form"
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
import Link from "next/link";

const newE_leaveFormSchema = z.object({
    leaveType: z
        .string({
            required_error: "Please select a leave type.",
        }),
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            </form>
        </Form>
    )
}