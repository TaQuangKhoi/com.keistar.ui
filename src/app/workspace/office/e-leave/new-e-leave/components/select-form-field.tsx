import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UseFormReturn} from "react-hook-form";
import {Loader2} from 'lucide-react';
import {motion} from "framer-motion";


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




export default function SelectFormField(
    {
        form,
        label,
        name,
        placeholder = "Select an option",
        options = [],
        valueKey = "value",
        nameKey = "name",
    }: {
        form: UseFormReturn<any>,
        label: string,
        name: string,
        placeholder?: string,
        options: any[],
        valueKey?: string,
        nameKey?: string,
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
                                    <motion.div
                                        animate={{rotate: 360}}
                                        transition={{repeat: Infinity, duration: 1, ease: "linear"}}
                                    >
                                        <Loader2/>
                                    </motion.div>
                                </SelectTrigger>
                            </Select>
                        )
                    }
                    {
                        options.length > 0 && (
                            <Select onValueChange={field.onChange} defaultValue={options[0][valueKey]}>
                            <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={placeholder}/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        options.map((option, index) => (
                                            <SelectItem key={index} value={option[valueKey]}>
                                                {option[nameKey]}
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