import { Prisma } from '@prisma/client';

const machineDetailVm = Prisma.validator<Prisma.MachineDefaultArgs>()({
  include: { bookings: true }
});

export type MachineDetailVm = Prisma.MachineGetPayload<typeof machineDetailVm>;
