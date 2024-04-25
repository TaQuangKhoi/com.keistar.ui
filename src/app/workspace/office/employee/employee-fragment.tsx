'use client';

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
import {ExtractAtomValue, useAtom, useAtomValue} from "jotai/index";
import {useEffect, useState} from "react";
import findsUser from "@/bonita/api/identity/user/definitions/finds-user";
import {User} from "@/bonita/api/bpm/archived-process-instance/types";
import {Input} from "@/components/ui/input";
import {selectedEmployee} from "@/app/workspace/office/employee/employee-selected-atom";


export default function EmployeeFragment() {
    const [selectedItem, setSelectedItem] = useAtom(selectedEmployee);
    const [engineUser, setEngineUser] = useState<User>({})

    useEffect(() => {
        // Get user from Bonita Engine
        findsUser(0, 10,
            `userName=${selectedItem.username}`,
            "", "").then((user) => {
            setEngineUser(user[0])
        })
    }, [selectedItem.username]);

    function updateSelectedItem(user: any) {
        // copy object from selectedItem
        let newSelectedItem = {...selectedItem};
        newSelectedItem.firstname = user.firstName;
        newSelectedItem.lastname = user.lastName;
        newSelectedItem.engine_id = user.id;
        // setSelectedItem(newSelectedItem);
    }

    return (
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
                            <Input className="border px-3 py-2 rounded-lg" id="firstName"
                                   disabled={selectedItem.id !== undefined}
                                   placeholder="First Name"
                                   value={engineUser?.firstname}
                                   type="text"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="lastName">
                                Last Name
                                <span className="text-red-500">*</span>
                            </label>
                            <input className="border px-3 py-2 rounded-lg" id="lastName"
                                   placeholder="Last Name"
                                   value={selectedItem.lastname}
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
                            <Input
                                disabled={selectedItem.id !== undefined}
                                className="border px-3 py-2 rounded-lg"
                                id="phone"
                                pattern="&quot;&quot;d*&quot;&quot;"
                                placeholder="Phone"
                                value={selectedItem.phone}
                                type="number"
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setSelectedItem((draft) => {
                                            draft.phone = e.target.value
                                        })
                                    }
                                }}
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
    )
}