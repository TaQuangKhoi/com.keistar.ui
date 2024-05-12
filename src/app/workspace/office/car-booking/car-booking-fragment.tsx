import {useAtom} from "jotai/index";
import {useEffect, useState} from "react";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import KeistarDatePickerWithRange, {DateRangeString} from "@/app/components/keistar-date-picker-with-range";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DateRange} from "react-day-picker";
import {Textarea} from "@/components/ui/textarea";
import Country_BDM from "@/app/types/country-bdm-interface";
import {selectedCarBookingAtom} from "@/app/workspace/office/car-booking/atoms/car-booking-selected-atom";

import findsBusinessData from "@/bonita/api/bdm/business-data-query";
import {addDays, format} from "date-fns";

export default function CarBookingFragment(
    {
        isInForm = false
    }: {
        isInForm?: boolean
    }
) {
    const [selectedItem, setSelectedItem] = useAtom(selectedCarBookingAtom);
    const disabled = isInForm || selectedItem?.status === "Returned Car" || selectedItem?.status === "Cancelled"
        || selectedItem?.status === "Received Car";

    const currentDate = new Date();
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: currentDate,
        to: addDays(currentDate, 2),
    })
    useEffect(() => {
        setSelectedItem((draft) => {
            draft.fromDate = dateRange?.from?.toISOString() || "";
            draft.toDate = dateRange?.to?.toISOString() || "";
        })
    }, [dateRange]);


    const [dateOnlyRange, setDateOnlyRange] = useState({
            from: currentDate.toLocaleDateString(),
            to: addDays(currentDate, 2).toLocaleDateString(),
        } as DateRangeString
    );


    const [assets, setAssets] = useState<Country_BDM[]>([])
    useEffect(() => {
        // fetch assets
        const getData = async () => {
            const _countries = await findsBusinessData(
                "com.keistar.model.library.Asset", "find", 0, 20, {}, 'directManager'
            )
            setAssets(_countries);
        };
        getData();
    }, []);


    return <div>
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
                        <Label htmlFor="country">Car Name</Label>
                        <Select
                            value={selectedItem?.asset?.persistenceId_string || ""}
                            // defaultValue={directManager?.persistenceId_string || ""}
                            onValueChange={(value) => {
                                setSelectedItem((draft) => {
                                    draft.asset = {
                                        persistenceId_string: value
                                    }
                                })
                            }}
                        >
                            <SelectTrigger disabled={disabled}>
                                <SelectValue placeholder="Select a car"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    assets.map((option, index) => (
                                        <SelectItem key={index} value={option.persistenceId_string || ""}>
                                            {option.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="startDateEndDate">Start Date - End Date</Label>
                        <KeistarDatePickerWithRange dateOnly={false}
                                                    disabled={disabled}

                                                    date={dateRange}
                                                    setDate={setDateRange}


                                                    setDateOnlyString={setDateOnlyRange}

                                                    hasTime={true}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <Textarea id="purpose"
                              value={selectedItem?.purpose}
                              onChange={(e) => {
                                  setSelectedItem((draft) => {
                                      draft.purpose = e.target.value
                                  })
                              }}
                              disabled={disabled}
                    />
                </div>
                {
                    selectedItem?.beforeKm && (
                        <div className={"mt-4"}>
                            <Label htmlFor="beforeKm">Before KM</Label>
                            <Input id="beforeKm"
                                   type="text"
                                   value={selectedItem?.beforeKm}
                                   disabled={true}
                            />
                        </div>
                    )
                }
                {
                    selectedItem?.receivedDate && (
                        <div className={"mt-4"}>
                            <Label htmlFor="receivedDate">Received Date</Label>
                            <Input id="receivedDate"
                                   type="text"
                                   value={format(new Date(selectedItem?.receivedDate), "dd/MM/yyyy HH:mm")}
                                   disabled={true}
                            />
                        </div>
                    )
                }
                {
                    selectedItem?.afterKm && (
                        <div className={"mt-4"}>
                            <Label htmlFor="afterKm">After KM</Label>
                            <Input id="afterKm"
                                   type="text"
                                   value={selectedItem?.afterKm}
                                   disabled={true}
                            />
                        </div>
                    )
                }
                {
                    selectedItem?.returnedDate && (
                        <div className={"mt-4"}>
                            <Label htmlFor="returnedDate">Returned Date</Label>
                            <Input id="returnedDate"
                                   type="text"
                                   value={format(new Date(selectedItem?.returnedDate), "dd/MM/yyyy HH:mm")}
                                   disabled={true}
                            />
                        </div>
                    )
                }
            </TabsContent>
        </Tabs>
    </div>
}