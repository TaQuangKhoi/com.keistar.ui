import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UseFormReturn} from "react-hook-form";
import {useEffect, useState} from "react";
import {findsBusinessData} from "@/bonita/api/bdm/business-data-query";


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

interface LeaveType {
    description: string,
    isActive: boolean,
    name: string,
    persistenceId: number,
    persistenceId_string: string,
    persistenceVersion: number,
    persistenceVersion_string: string,

}


export default function LeaveTypeFormField(
    {
        form,
        label,
        name,
        options = []
    }: {
        form: UseFormReturn<any>,
        label: string,
        name: string,
        options: any[]
    }
) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>
                        {label}
                    </FormLabel>
                    {
                        options.length === 0 && (
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Loading"/>
                                </SelectTrigger>
                            </Select>
                        )
                    }
                    {
                        options.length > 0 && (
                            <Select onValueChange={field.onChange} defaultValue={options[0].persistenceId_string}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a leave type"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        options.map((leaveType, index) => (
                                            <SelectItem key={index} value={leaveType.persistenceId_string}>
                                                {leaveType.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        )
                    }

                    {/*<FormDescription>*/}
                    {/*    You can manage verified email addresses in your{" "}*/}
                    {/*    <Link href="/examples/forms">email settings</Link>.*/}
                    {/*</FormDescription>*/}
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}