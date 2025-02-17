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
import {CalendarDaysIcon, Loader2} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {useEffect} from "react";
import {Input} from "@/components/ui/input";
import {selectedEmployeeAtom} from "@/app/workspace/office/employee/atoms/employee-selected-atom";
import {useImmerAtom} from 'jotai-immer'
import Employee_DateOfBirthComponent from "@/app/workspace/office/employee/components/date-of-birth-component";
import Employee_DirectManagerComponent from "@/app/workspace/office/employee/components/direct-manager-component";
import Employee_WorkTypeComponent from "@/app/workspace/office/employee/components/work-type-component";
import Employee_WorkPlaceComponent from "@/app/workspace/office/employee/components/work-place-component";
import {FullHumanTask} from "@/bonita/api/bpm/human-task/types";
import UploadFiles from "@/app/workspace/office/e-leave/new-e-leave/components/upload-files";


export default function EmployeeFragment(
    {
        isInForm = false,
        task,
    }: {
        isInForm?: boolean,
        task?: FullHumanTask
    }
) {
    const [selectedItem, setSelectedItem] = useImmerAtom(selectedEmployeeAtom);


    useEffect(() => {
        setSelectedItem((draft) => {
            draft.workplaceId = "0"
            draft.contractTypeId = "0"
            draft.workTypeId = "0"
            draft.probationStartDate = new Date('2022-01-01').toISOString();
            draft.probationEndDate = new Date('2022-12-31').toISOString();
            draft.hrManagerAcceptance = false
            draft.hrManagerComment = ''
            draft.directManagerComment = ''
        })
    }, []);


    return (
        <Tabs className="w-full" defaultValue="detailsAndNew">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="detailsAndNew">
                    {
                        selectedItem.persistenceId_string !== "" ? "Employee Details" : "New Employee"
                    }
                </TabsTrigger>
                {
                    isInForm && (
                        <TabsTrigger value="cvFiles">
                            CV Files
                        </TabsTrigger>
                    )
                }
            </TabsList>
            <TabsContent value="detailsAndNew">
                <div key="1" className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Employee_DirectManagerComponent/>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="firstName">
                                Username<span className="text-red-500">*</span>
                            </label>
                            <Input className="border px-3 py-2 rounded-lg" id="username"
                                   placeholder="Enter the username of new employee"
                                   value={selectedItem.username} type="text"
                                   onChange={(e) => {
                                       setSelectedItem((draft) => {
                                           draft.username = e.target.value
                                       })
                                   }}/>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="firstName">
                                First Name<span className="text-red-500">*</span>
                            </label>
                            <Input className="border px-3 py-2 rounded-lg" id="firstName"
                                   placeholder="First Name" type="text"
                                   value={selectedItem.firstName}
                                   onChange={(e) => {
                                       setSelectedItem((draft) => {
                                           draft.firstName = e.target.value
                                       })
                                   }}/>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="lastName">
                                Last Name<span className="text-red-500">*</span>
                            </label>
                            <Input className="border px-3 py-2 rounded-lg" id="lastName" type="text"
                                   placeholder="Last Name" value={selectedItem.lastName}
                                   onChange={(e) => {
                                       setSelectedItem((draft) => {
                                           draft.lastName = e.target.value
                                       })
                                   }}/>
                        </div>

                        <Employee_DateOfBirthComponent/>

                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="phone">
                                Phone</label>
                            <Input
                                className="border px-3 py-2 rounded-lg" id="phone"
                                pattern="&quot;&quot;d*&quot;&quot;" placeholder="Phone"
                                value={selectedItem.phone || ""} type="number"
                                onChange={(e) => {
                                    setSelectedItem((draft) => {
                                        draft.phone = e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="passportNo">
                                Passport No.</label>
                            <input className="border px-3 py-2 rounded-lg" id="passportNo"
                                   placeholder="Passport No." type="text"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="passportExpiryDate">
                                Passport Expiry Date</label>
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
                        {/*<div className="flex flex-col">*/}
                        {/*    <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="officialEmail"> Official*/}
                        {/*        Email<span className="text-red-500">*</span></label>*/}
                        {/*    <input className="border px-3 py-2 rounded-lg" id="officialEmail" type="email"*/}
                        {/*           placeholder="Official Email"/>*/}
                        {/*</div>*/}
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700"
                                   htmlFor="personalEmail">Personal Email<span className="text-red-500">*</span>
                            </label>
                            <Input className="border px-3 py-2 rounded-lg" id="personalEmail"
                                   placeholder="Personal Email" value={selectedItem.email} type="email"
                                   onChange={(e) => {
                                       setSelectedItem((draft) => {
                                           draft.email = e.target.value
                                       })
                                   }}/>
                        </div>
                        <Employee_WorkPlaceComponent/>
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700"
                                   htmlFor="position">Position</label>
                            <input className="border px-3 py-2 rounded-lg" id="position" placeholder="Position"
                                   value={selectedItem.positionName} type="text"
                                   onChange={(e) => {
                                       setSelectedItem((draft) => {
                                           draft.positionName = e.target.value
                                       })
                                   }}
                            />
                        </div>
                        <Employee_WorkTypeComponent/>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="cvFiles">
                <UploadFiles/>
            </TabsContent>
        </Tabs>
    )
}