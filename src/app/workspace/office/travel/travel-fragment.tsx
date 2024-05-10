'use client'
import Travel_Item from "@/app/workspace/office/travel/types/travel-interface";

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
import KeistarDatePickerWithRange from "@/app/components/keistar-date-picker-with-range";
import {useEffect, useState} from "react";
import {DateRange} from "react-day-picker";
import {addDays} from "date-fns";
import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import Country_BDM from "@/app/types/country-bdm-interface";
import KeistarEditableTable from "@/app/components/keistar-editable-table";
import {travelReasonsAtom} from "@/app/workspace/office/travel/atoms/travel-reasons-atom";
import {Separator} from "@/components/ui/separator";

export default function TravelFragment(
    {
        isInForm = false
    }: {
        isInForm?: boolean
    }
) {
    const [selectedItem, setSelectedItem] = useAtom(selectedTravelAtom);


    useEffect(() => {
        setSelectedItem((draft) => {
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
            setDateRange({
                from: new Date(selectedItem.startDate),
                to: new Date(selectedItem.endDate),
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
        from: currentDate.toLocaleDateString(),
        to: addDays(currentDate, 2).toLocaleDateString(),
    });


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
        <div className="">
            <Tabs className="w-full" defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
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
                            <KeistarDatePickerWithRange
                                dateOnly={true}
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
                            }}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}