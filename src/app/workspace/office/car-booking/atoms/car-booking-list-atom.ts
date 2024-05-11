import {atom} from "jotai";
import CarBookingInterface from "@/app/workspace/office/car-booking/types/car-booking-interface";

export const carBookingListAtom = atom<CarBookingInterface[]>([])