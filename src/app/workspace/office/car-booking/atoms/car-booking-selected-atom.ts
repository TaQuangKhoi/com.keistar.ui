import {atomWithImmer} from 'jotai-immer';
import CarBookingInterface from "@/app/workspace/office/car-booking/types/car-booking-interface";

export const selectedCarBookingAtom = atomWithImmer<CarBookingInterface>({});