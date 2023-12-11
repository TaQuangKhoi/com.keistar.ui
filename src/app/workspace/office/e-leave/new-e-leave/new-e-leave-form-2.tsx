"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";
import {Button, buttonVariants} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {cn} from "@/lib/utils";
import UploadFiles from "@/app/workspace/office/e-leave/new-e-leave/components/upload-files";

import {default as axios} from "@/lib/axios-instance";
import {instantiateProcess} from "@/bonita/api/bpm/process";
import {addDays} from "date-fns";
import LeaveTypeFormField from "@/app/workspace/office/e-leave/new-e-leave/components/leave-type-form-field";
import DatePickerWithRangeFormField
    from "@/app/workspace/office/e-leave/new-e-leave/components/date-picker-with-range-form-field";

const newE_leaveFormSchema = z.object({
    leaveTypeId: z
        .string({
            required_error: "Please select a leave type.",
        }),
    rememberMe: z.boolean().optional(),

    dateRange: z.object({
        from: z.date({
            required_error: "A start date is required.",
        }),
        to: z.date({
            required_error: "An end date is required.",
        }),
    }).required(),

    reason: z.string().max(160).min(4),

    attachments: z.array(z.string()).optional(),
})

type NewE_leaveFormValues = z.infer<typeof newE_leaveFormSchema>

const defaultValues: Partial<NewE_leaveFormValues> = {
    rememberMe: false,
    dateRange: {
        from: new Date(),
        to: addDays(new Date(), 2),
    },
}

interface E_leaveInput {
    status: string;
    employeeId: string;
    employeeFullName: string;
    directManagerId: string;
    managerFullName: string;
    leaveTypeId: number;
    leaveTime: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    reason: string;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isApprove: boolean;
    isCancel: boolean;
    isReject: boolean;
    extendLeaveType: Object;
    totalAnnualLeave: number;
    totalLeaveApplied: number;
    totalRemainLeave: number;
    sqlId: string;
    createdDateString: string;
    updatedDateString: string;
}

let eleaveInput: E_leaveInput = {
    status: "Waiting for approve",
    employeeId: "B17F5403-49D7-497E-BBBA-1B2326A4D657",
    employeeFullName: "Hanh Nguyen Hong",
    directManagerId: "B6C95A2A-46D2-487E-9DCD-B1414EC6AB2F",
    managerFullName: "Nguyet Pham Minh",
    leaveTypeId: 0,

    leaveTime: "Full day",
    startDate: new Date(),
    endDate: new Date(),
    totalDays: 1,

    reason: "",

    createdBy: "B17F5403-49D7-497E-BBBA-1B2326A4D657",
    createdDate: new Date(),
    updatedBy: "B17F5403-49D7-497E-BBBA-1B2326A4D657",
    updatedDate: new Date(),
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

const body = {
    eleaveInput: eleaveInput,
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

        body.eleaveInput.leaveTypeId = parseInt(data.leaveTypeId);
        body.eleaveInput.reason = data.reason;
        body.eleaveInput.startDate = data.dateRange.from;
        body.eleaveInput.endDate = data.dateRange.to;


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
        await initE_leaveProcess(processId)
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
                        <LeaveTypeFormField form={form} name="leaveTypeId"/>
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

                    <DatePickerWithRangeFormField form={form} className=""/>

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