import { BookingVm } from "~/models/BookingModels";
import { MachineListVm } from "~/models/MachineModels";

export type MachineListItemVm = Omit<MachineListVm, 'bookings'> & {
    bookings: BookingVm[];
  };

export function convertBookingDates(machine: MachineListVm): MachineListItemVm {
    return {
      ...machine,
      bookings: machine.bookings.map(booking => ({
        ...booking,
        startTime: new Date(booking.startTime),
        endTime: new Date(booking.endTime)
      }))
    };
  }