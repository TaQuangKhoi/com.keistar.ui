import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

export default function Employee_WorkTypeComponent() {
    return <div className="flex flex-col col-span-full">
        <label className="mb-1 text-sm font-medium text-gray-700">
            Work Type
            <span className="text-red-500">*</span>
        </label>
        <RadioGroup defaultValue={"FullRemote"} className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem id="fullRemote" value="FullRemote"/>
                <Label htmlFor="fullRemote">Full Remote</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem id="hybrid" value="Hybrid"/>
                <Label htmlFor="hybrid">Hybrid</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem id="officeBase" value="OfficeBase"/>
                <Label htmlFor="officeBase">Office-base</Label>
            </div>
        </RadioGroup>
    </div>
}