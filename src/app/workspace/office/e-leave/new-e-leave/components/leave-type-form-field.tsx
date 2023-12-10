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
        name,
    }: {
        form: UseFormReturn<any>,
        name: string
    }
) {
    const [leaveTypes, setLeaveTypes] = useState([] as LeaveType[])

    useEffect(() => {
        const getLeaveType = async () => {
            await findsBusinessData(
                "com.havako.model.office.LeaveType", "find", 0, 20
            ).then(function (response) {

                // set default value
                form.setValue(name, response.data[0].persistenceId_string)

                setLeaveTypes(response.data)
            })
        };

        getLeaveType();
    }, [])

    return (
        <FormField
            control={form.control}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Leave Type</FormLabel>
                    {
                        leaveTypes.length === 0 && (
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Loading"/>
                                </SelectTrigger>
                            </Select>
                        )
                    }
                    {
                        leaveTypes.length > 0 && (
                            <Select onValueChange={field.onChange} defaultValue={leaveTypes[0].persistenceId_string}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a leave type"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        leaveTypes.map((leaveType, index) => (
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