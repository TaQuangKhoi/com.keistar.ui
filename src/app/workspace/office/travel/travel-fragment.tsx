'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TKeeHvzT4iM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {TabsTrigger, TabsList, TabsContent, Tabs} from "@/components/ui/tabs"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {SelectValue, SelectTrigger, SelectItem, SelectContent, Select} from "@/components/ui/select"
import {useAtom} from "jotai/index";
import {selectedTravelAtom} from "@/app/workspace/office/travel/atoms/travel-selected-atom";
import KeistarDatePickerWithRange, {DateRangeString} from "@/app/components/keistar-date-picker-with-range";
import {useEffect, useState} from "react";
import {DateRange} from "react-day-picker";
import {addDays, format} from "date-fns";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import Country_BDM from "@/app/types/country-bdm-interface";
import KeistarEditableTable from "@/app/components/keistar-editable-table";
import {travelReasonsAtom} from "@/app/workspace/office/travel/atoms/travel-reasons-atom";
import {Separator} from "@/components/ui/separator";
import {travelAdvancePaymentAtom} from "@/app/workspace/office/travel/atoms/travel-advance-payment-atom";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";

export default function TravelFragment(
    {
        isInForm = false,
        task,
    }: {
        isInForm?: boolean,
        task?: FullHumanTask
    }
) {
    const [selectedItem, setSelectedItem] = useAtom(selectedTravelAtom);


    useEffect(() => {
        setSelectedItem((draft) => {
            if (draft.perDiemAdvance === undefined) {
                draft.perDiemAdvance = 0;
            }
            if (draft.perDiemOthers === undefined) {
                draft.perDiemOthers = 0;
            }
            draft.perDiemTotal = draft.perDiemAdvance + draft.perDiemOthers;
        })
    }, [selectedItem.perDiemAdvance, selectedItem.perDiemOthers]);


    const [travelReasons, setTravelReasons] = useAtom(travelReasonsAtom);
    useEffect(() => {
        setSelectedItem((draft) => {
            draft.reasons = travelReasons;
        })
    }, [travelReasons]);
    useEffect(() => {
        // if (selectedItem.persistenceId_string === undefined) {
        //     setTravelReasons([]);
        //     return;
        // }

        if (selectedItem.startDate) {
            const to = selectedItem.endDate ? new Date(selectedItem.endDate) : addDays(new Date(selectedItem.startDate), 2);
            setDateRange({
                from: new Date(selectedItem.startDate),
                to: to,
            })
        }
        // Update date when selected item changes

        setTravelReasons(selectedItem.reasons || []);
    }, [selectedItem.persistenceId_string]);


    const currentDate = new Date();
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: currentDate,
        to: addDays(currentDate, 2),
    })
    useEffect(() => {
        const _dateRangeFromTime = dateRange?.from?.getTime();
        const _dateRangeToTime = dateRange?.to?.getTime();
        if (_dateRangeFromTime && _dateRangeToTime) {
            const total = dateRange?.to ? Math.ceil((_dateRangeToTime - _dateRangeFromTime) / (1000 * 60 * 60 * 24)) : 0;
            setSelectedItem((draft) => {
                draft.totalDays = total + 1;
            })
        }
    }, [
        dateRange?.from,
        dateRange?.to
    ]);


    const [dateOnlyRange, setDateOnlyRange] = useState({
            from: format(currentDate, "yyyy-MM-dd"),
            to: format(addDays(currentDate, 2), "yyyy-MM-dd"),
        } as DateRangeString
    );


    const [countries, setCountries] = useState<Country_BDM[]>([])
    useEffect(() => {
        // fetch countries
        const getData = async () => {
            const _countries = await findsBusinessData(
                "com.keistar.model.library.Country", "find", 0, 20, {}, 'directManager'
            )
            setCountries(_countries);
        };
        getData();
    }, []);


    const [travelReasonTypes, setTravelReasonTypes] = useState([])
    useEffect(() => {
        const getData = async () => {
            const _travelReasonTypes = await findsBusinessData(
                "com.keistar.model.library.TravelReasonType", "find", 0, 20, {},
            )
            setTravelReasonTypes(_travelReasonTypes);
        };
        getData();
    }, []);
    useEffect(() => {
        setSelectedItem((draft) => {
            // draft.startDate = dateRange?.from?.toISOString() || currentDate.toISOString();
            // draft.endDate = dateRange?.to?.toISOString() || addDays(currentDate, 20).toISOString();
            draft.startDate = dateOnlyRange?.from;
            draft.endDate = dateOnlyRange?.to;
        })
    }, [
        dateRange,
        dateRange?.from,
        dateRange?.to
    ]);


    return (
        <div>
            <Tabs className="w-full" defaultValue={
                task?.name === "Advance Payment" ? "advancePayemnt" : "details"
            }>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    {
                        task?.name !== "Review Travel" && (
                            <TabsTrigger value="advancePayemnt">Advance Payment</TabsTrigger>
                        )
                    }
                </TabsList>
                <TabsContent className="" value="details">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {
                            selectedItem?.persistenceId_string && (
                                <div>
                                    <Label htmlFor="totals">Status</Label>
                                    <Input id="status"
                                           type="text"
                                           value={selectedItem.status}
                                           disabled={true}
                                    />
                                </div>
                            )
                        }
                        <div>
                            <Label htmlFor="startDateEndDate">Start Date - End Date</Label>
                            <KeistarDatePickerWithRange dateOnly={true}
                                                        disabled={isInForm}
                                                        date={dateRange}
                                                        setDate={setDateRange}

                                                        setDateOnlyString={setDateOnlyRange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="totals">Totals</Label>
                            <Input id="totals"
                                   type="number"
                                   value={selectedItem.totalDays}
                                   disabled={true}
                            />
                        </div>
                        <div>
                            <Label htmlFor="country">Country</Label>
                            <Select
                                value={selectedItem?.country?.persistenceId_string || ""}
                                // defaultValue={directManager?.persistenceId_string || ""}
                                onValueChange={(value) => {
                                    setSelectedItem((draft) => {
                                        draft.country = {
                                            persistenceId_string: value
                                        }
                                    })
                                }}
                            >
                                <SelectTrigger disabled={isInForm}>
                                    <SelectValue placeholder="Select a country"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        countries.map((option, index) => (
                                            <SelectItem key={index} value={option.persistenceId_string || ""}>
                                                {option.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location"
                                   type="text"
                                   value={selectedItem?.location}
                                   onChange={(e) => {
                                       setSelectedItem((draft) => {
                                           draft.location = e.target.value
                                       })
                                   }}
                                   disabled={isInForm}
                            />
                        </div>
                    </div>

                    <Separator className="mb-4"/>

                    <h2>
                        Request for Advance
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <Label htmlFor="per-diem-request">Per diem Request</Label>
                            <Input id="status"
                                   type="number"
                                   value={selectedItem.perDiemAdvance}
                                   onChange={(e) => {
                                       setSelectedItem((draft) => {
                                           draft.perDiemAdvance = Number(e.target.value)
                                       })
                                   }}
                                   disabled={isInForm}
                            />
                        </div>
                        <div>
                            <Label htmlFor="others-request">Others Request</Label>
                            <Input id="status"
                                   type="number"
                                   value={selectedItem.perDiemOthers}
                                   onChange={(e) => {
                                       setSelectedItem((draft) => {
                                           draft.perDiemOthers = Number(e.target.value)
                                       })
                                   }}
                                   disabled={isInForm}
                            />
                        </div>
                        <div>
                            <Label htmlFor="total-request">Total Request</Label>
                            <Input id="status"
                                   type="number"
                                   value={selectedItem.perDiemTotal}
                                   disabled={true}
                            />
                        </div>
                    </div>

                    <Separator className="mb-4"/>

                    <div className="mb-4">
                        <KeistarEditableTable
                            title={"Travel Reasons"}
                            data={travelReasonsAtom}
                            config={{
                                key: ["#", "reasonType", "details", "percentage"],
                                head: ["#", "Type", "Detail", "Percentage"],
                                input: ["#", "select", "input", "input"],
                                selectOptions: [
                                    null, travelReasonTypes, null, null
                                ],
                                editable: [!isInForm, !isInForm, !isInForm, !isInForm],
                                allowAdd: !isInForm,
                                allowDelete: !isInForm,
                                hidden: [false, false, false, false],
                            }}
                        />
                    </div>
                </TabsContent>
                <TabsContent className="" value="advancePayemnt">
                    <KeistarEditableTable
                        title={"Advance Payment"}
                        data={travelAdvancePaymentAtom}
                        config={{
                            key: ["#", "persistenceId_string", "ap_date", "amount", "purpose"],
                            head: ["#", "", "Date", "amount", "purpose"],
                            input: ["#", "persistenceId_string", "date", "input", "input"],
                            selectOptions: [
                                null, null, null, null
                            ],
                            editable: [true, true, true, true],
                            allowAdd: true,
                            allowDelete: true,
                            hidden: [false, true, false, false, false],
                        }}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}