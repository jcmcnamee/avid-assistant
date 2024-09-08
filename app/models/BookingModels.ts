import { Prisma } from '@prisma/client';

const createBookingDto = Prisma.validator<Prisma.BookingDefaultArgs>()({
  select: {
    startTime: true,
    endTime: true,
    jobType: true,
    notes: true,
    machineId: true,
    userId: true
  }
});

export const bookingViewModel = Prisma.validator<Prisma.BookingDefaultArgs>()({
  select: {
    startTime: true,
    endTime: true,
    jobType: true,
    notes: true,
    machineId: true,
    userId: true
  }
});


export type CreateBookingDto = Prisma.BookingGetPayload<
  typeof createBookingDto
>;

export type BookingVm = Prisma.BookingGetPayload<typeof bookingViewModel>;
