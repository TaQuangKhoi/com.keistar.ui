import * as z from "zod";
import {addDays} from "date-fns";

const newE_leaveFormSchema = z.object({
    leaveTypeId: z
        .string({
            required_error: "Please select a leave type.",
        }),
    rememberMe: z.boolean().optional(),

    dateStatus: z.string().optional(),
    totalDays: z.number().optional(),

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

export type NewE_leaveFormValues = z.infer<typeof newE_leaveFormSchema>

const defaultValues: Partial<NewE_leaveFormValues> = {
    rememberMe: false,
    totalDays: 0,
    dateRange: {
        from: new Date(),
        to: addDays(new Date(), 2),
    },
}

export {
    newE_leaveFormSchema,
    defaultValues,
}