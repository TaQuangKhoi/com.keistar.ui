import { Bell } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function Notification() {
    return <Popover>
        <PopoverTrigger asChild>
            <Bell className="cursor-pointer"/>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            Có khi là tôi bơ vơ tiếng thở dài
        </PopoverContent>
    </Popover>
}