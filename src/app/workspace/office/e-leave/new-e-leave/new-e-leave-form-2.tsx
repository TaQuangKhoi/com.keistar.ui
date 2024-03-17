"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm, useWatch} from "react-hook-form"

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
import SelectFormField from "@/app/workspace/office/e-leave/new-e-leave/components/select-form-field";
import DatePickerWithRangeFormField
    from "@/app/workspace/office/e-leave/new-e-leave/components/date-picker-with-range-form-field";
import {useEffect, useRef, useState} from "react";
import {findsBusinessData} from "@/bonita/api/bdm/business-data-query";
import {Input} from "@/components/ui/input";
import {differenceInBusinessDays, differenceInCalendarDays, differenceInDays} from 'date-fns';
import {
    defaultValues,
    newE_leaveFormSchema,
    NewE_leaveFormValues
} from "@/app/workspace/office/e-leave/new-e-leave/components/new-e-leave-form-utils";
import {Icons} from "@/components/icons";
import {getCurrentUserSession, useSession} from "@/bonita/api/system/get-the-current-user-session";


interface LeaveType {
    description: string,
    isActive: boolean,
    name: string,
    persistenceId: number,
    persistenceId_string: string,
    persistenceVersion: number,
    persistenceVersion_string: string,
}

/**
 * Mimic the contract of contract in process
 */
interface E_leaveInput {
    status: string;

    requesterId?: string;

    leaveType?: {
        persistenceId_string: number
    };

    leaveTime?: string;

    reason?: string;

    startDate?: Date;
    endDate?: Date;
    totalDays?: number;

    createdBy?: string;
    createdDate?: Date;

    updatedBy?: string;
    updatedDate?: Date;
}

let e_leaveInput: E_leaveInput = {
    status: "Waiting for approve",
}

const body = {
    eleaveInput: e_leaveInput,
}

const dateStatuses = [
    {
        value: "full",
        label: "Full day",
    },
    {
        value: "am",
        label: "Morning",
    },
    {
        value: "pm",
        label: "Afternoon",
    },

]

export function NewE_leaveForm() {
    const [options, setOptions] = useState([] as LeaveType[])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [session] : [Session, boolean, any] = useSession()

    const form = useForm<NewE_leaveFormValues>(
        {
            resolver: zodResolver(newE_leaveFormSchema),
            defaultValues,
            mode: "onChange",
        },
    )
    const dateRange = useWatch(
        {
            control: form.control,
            name: "dateRange",
        }
    )
    const dateStatus = useWatch(
        {
            control: form.control,
            name: "dateStatus",
        }
    )
    const [totalDays, setTotalDays] = useState(0)


    /**
     * Get leave type from bonita
     */
    useEffect(() => {
        const getLeaveType = async () => {
            await findsBusinessData(
                "com.havako.model.office.LeaveType", "find", 0, 20
            ).then(function (response) {

                // set default value
                form.setValue("leaveTypeId", response.data[0].persistenceId_string)

                setOptions(response.data)
            })
        };

        getLeaveType();
    }, [])


    async function onSubmit(data: NewE_leaveFormValues) {
        setIsLoading(true)

        const newE_leaveInput = Object.assign(body.eleaveInput, {
            requester: session.user_id,
            leaveType: {
                persistenceId_string: parseInt(data.leaveTypeId)
            },

            reason: data.reason,
            leaveTime: data.dateStatus,

            startDate: data.dateRange.from,
            endDate: data.dateRange.to,
            totalDays: data.totalDays,

            createdBy: session.user_id,
            createdDate: new Date(),

            updatedBy: session.user_id,
            updatedDate: new Date(),
        });

        const newBody = {
            eleaveInput: newE_leaveInput,
        }

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

        try {
            const resutl = await instantiateProcess(processId, newBody);
            setIsLoading(false)

        } catch (e) {
            console.error(e);
            setIsLoading(false)
        }
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        //     })
    }


    function getTotalDays() {
        let diffInDays = differenceInBusinessDays(
            form.getValues("dateRange")?.to,
            form.getValues("dateRange")?.from
        );

        let _totalDays = 0;
        switch (dateStatus) {
            case "full":
                _totalDays = diffInDays + 1;
                break;
            case "am":
                _totalDays = diffInDays + 0.5;
                break;
            case "pm":
                _totalDays = diffInDays + 0.5;
                break;
            default:
                _totalDays = 0;
                break;
        }

        return _totalDays;
    }

    function updateTotalDays(totalDays: number) {
        // check if totalDays is NaN
        if (isNaN(totalDays)) {
            totalDays = 0;
        }
        form.setValue("totalDays", totalDays);
        setTotalDays(totalDays);
    }


    /**
     * Update total days
     */
    useEffect(() => {
        let _totalDays = getTotalDays();
        updateTotalDays(_totalDays)
    }, [dateRange, dateStatus]);


    return (
        <Form {...form}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="col-span-2 space-y-8">

                    <DatePickerWithRangeFormField form={form} className=""/>

                    <div className="flex gap-5">
                        <div className="w-full">
                            <SelectFormField
                                form={form}
                                name="dateStatus"
                                options={dateStatuses}
                                label="Date Status"
                                valueKey="value"
                                nameKey="label"
                                placeholder={"Select a date status"}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="totalDays"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Total days</FormLabel>
                                        <FormControl>
                                            <Input type="text"
                                                   placeholder="Total days"
                                                   {...field}
                                                   disabled={true}
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
                        </div>
                    </div>

                    <div className="flex-row space-y-2">
                        <SelectFormField
                            form={form} name="leaveTypeId"
                            options={options}
                            label="Leave Type"
                            valueKey="persistenceId_string"
                            placeholder={"Select a leave type"}
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
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Request Now
                    </Button>
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