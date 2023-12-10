import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


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


export default function LeaveTypeFormField(
    {
        form,
        name,
    }: {
        form: any,
        name: string
    }
) {
    return (
        <FormField
            control={form.control}
            name={name}
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
    )
}