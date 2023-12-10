"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Button, buttonVariants} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import DatePickerWithRange from "@/app/cards/components/date-picker-with-range";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {cn} from "@/lib/utils";
import UploadFiles from "@/app/workspace/office/e-leave/new-e-leave/components/upload-files";

import {default as axios} from "@/lib/axios-instance";
import {instantiateProcess} from "@/bonita/api/bpm/process";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import LeaveTypeFormField from "@/app/workspace/office/e-leave/new-e-leave/components/leave-type-form-field";
import DatePickerWithRangeFormField
    from "@/app/workspace/office/e-leave/new-e-leave/components/date-picker-with-range-form-field";

const newE_leaveFormSchema = z.object({
    leaveType: z
        .string({
            required_error: "Please select a leave type.",
        }),
    rememberMe: z.boolean().optional(),

    startDate: z.date({
        required_error: "A start date is required.",
    }),
    // endDate: z.date({
    //     required_error: "An end date is required.",
    // }),

    reason: z.string().max(160).min(4),

    attachments: z.array(z.string()).optional(),
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

const body = {
    eleaveInput: {
        status: "Waiting for approve",
        employeeId: "B17F5403-49D7-497E-BBBA-1B2326A4D657",
        employeeFullName: "Hanh Nguyen Hong",
        directManagerId: "B6C95A2A-46D2-487E-9DCD-B1414EC6AB2F",
        managerFullName: "Nguyet Pham Minh",
        leaveTypeId: "",
        leaveTypeName: "",
        leaveTime: "Full day",
        startDate: "2023-12-08T00:00:00.000Z",
        endDate: "2023-12-08T00:00:00.000Z",
        totalDays: 1,

        reason: "",

        createdBy: "B17F5403-49D7-497E-BBBA-1B2326A4D657",
        createdDate: null,
        updatedBy: "B17F5403-49D7-497E-BBBA-1B2326A4D657",
        updatedDate: null,
        isApprove: false,
        isCancel: false,
        isReject: false,
        extendLeaveType: {
            ID: "FFFFD914-6057-4286-A321-773680D400A9",
            Name: "Annual",
            Description: ""
        },
        totalAnnualLeave: 129.25199999999944,
        totalLeaveApplied: 103.5,
        totalRemainLeave: 25.75200000000011,
        sqlId: "F9E4E64A-CED9-4EB4-9C1F-6360083158FD",
        createdDateString: "2023-12-08 13:49:26.542",
        updatedDateString: "2023-12-08 13:49:26.542"
    }
}

export function NewE_leaveForm() {

    const form = useForm<NewE_leaveFormValues>({
        resolver: zodResolver(newE_leaveFormSchema), defaultValues,
        mode: "onChange",
    })

    async function initE_leaveProcess(processId: string) {
        let res = await instantiateProcess(processId, body);
    }

    async function onSubmit(data: NewE_leaveFormValues) {

        console.debug("New data", data)
        body.eleaveInput.reason = data.reason;


        let processId = await axios.get(
            '/API/bpm/process?s=Create_Eleave&p=0&c=1&o=version%20DESC&f=activationState=ENABLED',
            {
                withCredentials: true,
            }
        )
            .then(function (response) {
                // handle success
                return response.data[0].id;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        // await initE_leaveProcess(processId)
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        //     })
    }

    return (
        <Form {...form}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="col-span-2 space-y-8">
                    <div className="flex-row space-y-2">
                        <LeaveTypeFormField form={form} name="leaveType"/>
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
                    <DatePickerWithRangeFormField/>

                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Start date must be before end date.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="reason"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Reason</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="attachments"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Attachments</FormLabel>
                                <FormControl>
                                    <UploadFiles/>
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
                    <Link href={'./'} className={cn(buttonVariants({variant: "secondary"}), "ml-2")}>
                        Close
                    </Link>
                </form>
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>
                            Your Request Includes
                        </CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    {/*<CardContent>*/}
                    {/*    <RecentSales/>*/}
                    {/*</CardContent>*/}
                </Card>
            </div>
        </Form>
    )
}