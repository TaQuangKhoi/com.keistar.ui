/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X2OytZX4ynZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {TabsTrigger, TabsList, TabsContent, Tabs} from "@/components/ui/tabs"
import {SelectValue, SelectTrigger, SelectItem, SelectContent, Select} from "@/components/ui/select"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CalendarDaysIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {useAtom} from "jotai/index";
import {useEffect} from "react";
import Employee_Item from "@/app/workspace/office/employee/types/employee-interface";


export default function EmployeeFragment(
    {
        selected
    }: {
        selected: any
    }
) {
    const [selectedItem, setSelectedItem] = useAtom<Employee_Item>(selected);

    useEffect(() => {
        console.debug("EmployeeFragment: ", selectedItem)
    }, [selectedItem]);

    return (
        <div key="1" className="p-6">
            <Tabs className="w-full" defaultValue="detailsAndNew">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="detailsAndNew">
                        {
                            selectedItem.id !== undefined ? "Employee Details" : "New Employee"
                        }
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="detailsAndNew">
                    <div key="1" className="bg-white p-6 rounded-lg shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col w-full">
                                <label className="mb-1 text-sm font-medium text-gray-700"
                                       htmlFor="directManager">
                                    Direct Manager
                                </label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue>Hanh Nguyen Hong</SelectValue>
                                    </SelectTrigger>
                                </Select>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="firstName">
                                    First Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input className="border px-3 py-2 rounded-lg" id="firstName"
                                       placeholder="First Name"
                                       type="text"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="lastName">
                                    Last Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input className="border px-3 py-2 rounded-lg" id="lastName"
                                       placeholder="Last Name"
                                       type="text"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="dateOfBirth">
                                    Date Of Birth
                                </label>
                                <div className="flex">
                                    <input
                                        className="border px-3 py-2 rounded-l-lg flex-1"
                                        id="dateOfBirth"
                                        placeholder="Enter a date (dd/MM/yyyy)"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    className="border px-3 py-2 rounded-lg"
                                    id="phone"
                                    pattern="&quot;&quot;d*&quot;&quot;"
                                    placeholder="Phone"
                                    value={selectedItem.phone}
                                    type="number"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="passportNo">
                                    Passport No.
                                </label>
                                <input className="border px-3 py-2 rounded-lg" id="passportNo"
                                       placeholder="Passport No." type="text"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700"
                                       htmlFor="passportExpiryDate">
                                    Passport Expiry Date
                                </label>
                                <div className="flex">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className="w-full justify-start text-left font-normal"
                                                    variant="outline">
                                                <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1"/>
                                                Pick a date
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="w-auto p-0">
                                            <Calendar initialFocus mode="single"/>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700"
                                       htmlFor="officialEmail">
                                    Official Email
                                    <span className="text-red-500">*</span>
                                </label>
                                <input className="border px-3 py-2 rounded-lg" id="officialEmail"
                                       placeholder="Official Email" type="email"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700"
                                       htmlFor="personalEmail">
                                    Personal Email
                                    <span className="text-red-500">*</span>
                                </label>
                                <input className="border px-3 py-2 rounded-lg" id="personalEmail"
                                       placeholder="Personal Email" type="email"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="workplace">
                                    Workplace
                                    <span className="text-red-500">*</span>
                                </label>
                                <Select>
                                    <SelectTrigger id="workplace">
                                        <SelectValue placeholder="Select"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Hanoi-CharmvitBuilding">Ha Noi - Charmvit
                                            Building</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="position">
                                    Position
                                </label>
                                <input className="border px-3 py-2 rounded-lg" id="position"
                                       placeholder="Position"
                                       type="text"/>
                            </div>
                            <div className="flex flex-col col-span-full">
                                <label className="mb-1 text-sm font-medium text-gray-700">
                                    Work Type
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroup>
                                            <RadioGroupItem id="fullRemote" value="FullRemote"/>
                                            <Label htmlFor="fullRemote">Full Remote</Label>
                                        </RadioGroup>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroup>
                                            <RadioGroupItem id="hybrid" value="Hybrid"/>
                                            <Label htmlFor="hybrid">Hybrid</Label>
                                        </RadioGroup>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroup>
                                            <RadioGroupItem id="officeBase" value="OfficeBase"/>
                                            <Label htmlFor="officeBase">Office-base</Label>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}