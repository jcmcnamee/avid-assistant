import { Prisma } from '@prisma/client';
import { bookingViewModel } from './BookingModels';

const machineDetailVm = Prisma.validator<Prisma.MachineDefaultArgs>()({
  include: { bookings: true }
});

const machineListVm = Prisma.validator<Prisma.MachineDefaultArgs>()({
  include: {
    bookings: bookingViewModel
  }
});

export type MachineDetailVm = Prisma.MachineGetPayload<typeof machineDetailVm>;
export type MachineListVm = Prisma.MachineGetPayload<typeof machineListVm>;
