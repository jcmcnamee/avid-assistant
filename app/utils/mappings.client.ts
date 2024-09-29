import { Booking } from '@prisma/client';
import { SerializeFrom } from '@remix-run/node';
import { MachineListVm } from '~/models/MachineModels';

export function deserializeMachineList(
  machines: SerializeFrom<MachineListVm[]>
): MachineListVm[] {
  return machines.map(machine => ({
    ...machine,
    bookings: machine.bookings.map(booking => ({
      ...booking,
      startTime: new Date(booking.startTime),
      endTime: new Date(booking.endTime)
    }))
  }));
}

export function deserializeBooking(booking: SerializeFrom<Booking>): Booking {
  return {
    ...booking,
    startTime: new Date(booking.startTime),
    endTime: new Date(booking.endTime),
    dateCreated: new Date(booking.dateCreated),
    dateModified: new Date(booking.dateModified)
  };
}
