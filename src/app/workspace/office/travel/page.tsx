import {Metadata} from "next";
import TravelPage from "@/app/workspace/office/travel/travel-page";

export const metadata: Metadata = {
    title: "Travel",
    description: "Travel module for office",
}

export default function NextJSTravelPage() {
    return <TravelPage/>
}