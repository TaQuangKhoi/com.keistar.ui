import CarBookingPage from "@/app/workspace/office/car-booking/car-booking-page";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Car Booking",
    description: "Book a car for your next trip.",
}

export default function NextJSCarBookingPage() {
    return <CarBookingPage />;
}