import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function Employee_WorkPlaceComponent() {
    return <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="workplace">
            Workplace<span className="text-red-500">*</span>
        </label>
        <Select>
            <SelectTrigger id="workplace"><SelectValue placeholder="Select"/></SelectTrigger>
            <SelectContent>
                <SelectItem value="Hanoi-CharmvitBuilding">Ha Noi - Charmvit Building</SelectItem>
            </SelectContent>
        </Select>
    </div>
}