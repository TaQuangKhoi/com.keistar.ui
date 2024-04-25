/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X2OytZX4ynZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {TabsTrigger, TabsList, TabsContent, Tabs} from "@/components/ui/tabs"
import {SelectValue, SelectTrigger, SelectItem, SelectContent, Select} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {TableHead, TableRow, TableHeader, TableCell, TableBody, Table} from "@/components/ui/table"
import {useAtom} from "jotai/index";
import OT_Item from "@/app/workspace/office/ot/types/ot-inteface";

export default function OTFragment(
    {
        selected
    }: {
        selected: any
    }
) {
    const [selectedItem, setSelectedItem] = useAtom<OT_Item>(selected);

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
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a person"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="person1">Vu Nguyen Quang Phap</SelectItem>
                                        <SelectItem value="person2">John Doe</SelectItem>
                                        <SelectItem value="person3">Jane Smith</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">From Date - To Date</label>
                                <Input placeholder="02/04/2024 - 02/04/2024"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">AM: From</label>
                                <Input placeholder="07:30" type="time"/>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">To</label>
                                <Input placeholder="11:30" type="time"/>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">PM: From</label>
                                <Input placeholder="13:00" type="time"/>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">To</label>
                                <Input placeholder="17:00" type="time"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Total hours applied</label>
                                <Input placeholder="Enter total hours" type="number"
                                       value={selectedItem.total_hours}/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Cancel Reasons</label>
                            <Textarea placeholder="Đỗ Quyên"/>
                        </div>
                        <div>
                            <h3 className="text-lg">Reasons</h3>
                            <Table className="border">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">#</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Opportunity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">1</div>
                                        </TableCell>
                                        <TableCell>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="type1">Type 1</SelectItem>
                                                    <SelectItem value="type2">Type 2</SelectItem>
                                                    <SelectItem value="type3">Type 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Input placeholder="Data 3"/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">2</div>
                                        </TableCell>
                                        <TableCell>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="type1">Type 1</SelectItem>
                                                    <SelectItem value="type2">Type 2</SelectItem>
                                                    <SelectItem value="type3">Type 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Input placeholder="Data 6"/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}