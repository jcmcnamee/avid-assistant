import { Prisma } from '@prisma/client';
import { bookingViewModelSelect } from './BookingModels';

const machineDetailVmSelect = {
  id: true,
  name: true,
  isHeadless: true,
  bookings: {
    select: bookingViewModelSelect
  }
} satisfies Prisma.MachineSelect;

// Machine list with current bookings
export const machineListVmSelect = {
  id: true,
  name: true,
  isHeadless: true,
  bookings: {
    select: bookingViewModelSelect,
    where: {
      startTime: {
        lte: new Date()
      },
      endTime: {
        gte: new Date()
      }
    }
  }
} satisfies Prisma.MachineSelect;

export type MachineDetailVm = Prisma.MachineGetPayload<{
  select: typeof machineDetailVmSelect;
}>;

export type MachineListVm = Prisma.MachineGetPayload<{
  select: typeof machineListVmSelect;
}>;
