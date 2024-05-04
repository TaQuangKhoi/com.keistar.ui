/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X2OytZX4ynZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {TabsTrigger, TabsList, TabsContent, Tabs} from "@/components/ui/tabs"
import {SelectValue, SelectTrigger, SelectItem, SelectContent, Select} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {useAtom} from "jotai/index";
import {selectedOtAtom} from "@/app/workspace/office/ot/atoms/ot-selected-atom";
import {useEffect, useState} from "react";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";
import KeistarDatePickerWithRange from "@/app/components/keistar-date-picker-with-range";
import {DateRange} from "react-day-picker";
import {addDays} from "date-fns";
import {useSession} from "@/bonita/api/system/get-the-current-user-session";
import KeistarEditableTable from "@/app/components/keistar-editable-table";
import callLink from "@/bonita/api/bdm/call-link";

export default function OTFragment(
    {
        isInForm = false
    }: {
        isInForm?: boolean
    }
) {
    const currentDate = new Date();
    const [selectedItem, setSelectedItem] = useAtom(selectedOtAtom);
    const [approvers, setApprovers] = useState<Employee_Item[]>([])
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: currentDate,
        to: addDays(currentDate, 20),
    })
    const [session]: [Session, boolean, any] = useSession()

    useEffect(() => {
        const getData = async () => {
            const employees = await findsBusinessData(
                "com.keistar.model.office.Employee", "findsOrderByUpdatedDate", 0, 20, {}, 'directManager'
            )
            setApprovers(employees);
        };
        getData();
    }, []);

    useEffect(() => {
        setSelectedItem((draft) => {
            draft.startDate = dateRange?.from?.toISOString() || currentDate.toISOString();
            draft.endDate = dateRange?.to?.toISOString() || addDays(currentDate, 20).toISOString();
        })
    }, [
        dateRange?.from,
        dateRange?.to
    ]);

    /**
     * Update employee attribute for selected item
     */
    useEffect(() => {
        if (selectedItem.persistenceId_string === "") {
            setSelectedItem((draft) => {
                draft.employee.persistenceId_string = session.user_id || "";
            })
        }
    }, [session.user_id]);

    /**
     * Calculate total hours
     */
    useEffect(() => {
        const amFrom = new Date(`01/01/2000 ${selectedItem.amFromHours}`);
        const amTo = new Date(`01/01/2000 ${selectedItem.amToHours}`);
        const pmFrom = new Date(`01/01/2000 ${selectedItem.pmFromHours}`);
        const pmTo = new Date(`01/01/2000 ${selectedItem.pmToHours}`);

        if (!dateRange?.from || !dateRange?.to) {
            return;
        }

        const numberOfDays = Math.floor((dateRange?.to?.getTime() - dateRange?.from?.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const totalHour = (pmTo.getTime() - pmFrom.getTime() + amTo.getTime() - amFrom.getTime()) / 1000 / 60 / 60 * numberOfDays;

        setSelectedItem((draft) => {
            draft.totalHour = totalHour;
        })
    }, [
        selectedItem.amFromHours,
        selectedItem.amToHours,
        selectedItem.pmFromHours,
        selectedItem.pmToHours,
        dateRange?.from,
        dateRange?.to
    ]);

    return (
        <div key="1" className="p-6">
            <Tabs className="w-full" defaultValue="register">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="register">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="register">
                    <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Approver</label>
                                <Select
                                    value={selectedItem?.approver?.persistenceId_string || ""}
                                    // defaultValue={directManager?.persistenceId_string || ""}
                                    onValueChange={(value) => {
                                        console.debug("value", value)
                                        console.debug("selectedItem", selectedItem)
                                        setSelectedItem((draft) => {
                                            draft.approver = {
                                                persistenceId_string: value
                                            }
                                        })
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a person"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            approvers.map((option, index) => (
                                                <SelectItem key={index} value={option.persistenceId_string || ""}>
                                                    {option.username}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">From Date - To Date</label>
                                <KeistarDatePickerWithRange
                                    date={dateRange}
                                    setDate={setDateRange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">AM: From</label>
                                <Input placeholder="08:00"
                                       type="time"
                                       value={selectedItem.amFromHours}
                                       onChange={(e) => {
                                           setSelectedItem((draft) => {
                                               draft.amFromHours = e.target.value
                                           })
                                       }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">To</label>
                                <Input placeholder="11:30" type="time"
                                       value={selectedItem.amToHours}
                                       onChange={(e) => {
                                           setSelectedItem((draft) => {
                                               draft.amToHours = e.target.value
                                           })
                                       }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">PM: From</label>
                                <Input placeholder="13:00" type="time"
                                       value={selectedItem.pmFromHours}
                                       onChange={(e) => {
                                           setSelectedItem((draft) => {
                                               draft.pmFromHours = e.target.value
                                           })
                                       }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">To</label>
                                <Input placeholder="17:00" type="time"
                                       value={selectedItem.pmToHours}
                                       onChange={(e) => {
                                           setSelectedItem((draft) => {
                                               draft.pmToHours = e.target.value
                                           })
                                       }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Total hours applied</label>
                                <Input placeholder="Enter total hours" type="number" disabled={true}
                                       value={selectedItem.totalHour}/>
                            </div>
                        </div>
                        <div className="space-y-2"
                             hidden={
                                 selectedItem.status !== "CANCELLED"
                             }
                        >
                            <label className="block text-sm font-medium">Cancel Reasons</label>
                            <Textarea placeholder="Enter reasons"
                                      value={selectedItem.cancelReason}
                                      onChange={(e) => {
                                          setSelectedItem((draft) => {
                                              draft.cancelReason = e.target.value
                                          })
                                      }}
                            />
                        </div>
                        <div>
                            <KeistarEditableTable
                                title={"Reasons"}
                                config={{
                                    key: ["#", "type", "opportunity"],
                                    head: ["#", "Type", "Opportunity"],
                                    input: ["#", "select", "input"]
                                }}
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}