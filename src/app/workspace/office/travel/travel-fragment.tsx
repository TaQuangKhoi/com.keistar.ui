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
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table"
import {useAtom} from "jotai/index";
import {selectedTravelAtom} from "@/app/workspace/office/travel/atoms/travel-selected-atom";

export default function TravelFragment(
    {
        isInForm = false
    }: {
        isInForm?: boolean
    }
) {
    const [selectedItem, setSelectedItem] = useAtom(selectedTravelAtom);

    return (
        <div className="">
            <Tabs className="w-full" defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent className="" value="details">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label htmlFor="travelRequestId">Travel Request ID</Label>
                            <Input id="travelRequestId" placeholder="testCode"/>
                        </div>
                        <div>
                            <Label htmlFor="requestor">Requestor</Label>
                            <Input id="requestor" placeholder="admintest_1"/>
                        </div>
                        <div>
                            <Label htmlFor="startDateEndDate">Start Date - End Date</Label>
                            <Input id="startDateEndDate" placeholder="15/01/2024 - 15/01/2024"/>
                        </div>
                        <div>
                            <Label htmlFor="totals">Totals</Label>
                            <Input id="totals" placeholder="1"/>
                        </div>
                        <div>
                            <Label htmlFor="country">Country</Label>
                            <Select>
                                <SelectTrigger id="country">
                                    <SelectValue placeholder="Select Country"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="country1">Country 1</SelectItem>
                                    <SelectItem value="country2">Country 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Select>
                                <SelectTrigger id="location">
                                    <SelectValue placeholder="Location"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="location1">Location 1</SelectItem>
                                    <SelectItem value="location2">Location 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <hr className="mb-4"/>
                    <div className="mb-4 font-bold">
                        <h2>Travel Reasons</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Contract/Opportunity Code</TableHead>
                                <TableHead>Percent (%)</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>General Expense</TableHead>
                                <TableHead>Special Expense</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center col-span-6">
                                    No Rows To Show
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    )
}