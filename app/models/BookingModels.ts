import { Prisma } from '@prisma/client';

const updateBookingDtoSelect = {
  startTime: true,
  endTime: true,
  jobType: true,
  notes: true,
  machineId: true,
  userId: true,
  dateModified: true
} satisfies Prisma.BookingSelect;

const createBookingDtoSelect = {
  startTime: true,
  endTime: true,
  jobType: true,
  notes: true,
  machineId: true,
  userId: true
} satisfies Prisma.BookingSelect;

export const bookingDetailViewModelSelect = {
  id: true,
  startTime: true,
  endTime: true,
  jobType: true,
  notes: true,
  dateCreated: true,
  dateModified: true,
  machine: {
    select: {
      id: true,
      name: true
    }
  },
  appUser: {
    select: {
      id: true,
      name: true
    }
  }
} satisfies Prisma.BookingSelect;

export const bookingListViewModelSelect = {
  id: true,
  startTime: true,
  endTime: true,
  jobType: true,
  notes: true,
  machine: {
    select: {
      id: true,
      name: true
    }
  },
  appUser: {
    select: {
      id: true,
      name: true
    }
  }
} satisfies Prisma.BookingSelect;

export const bookingViewModelSelect = {
  id: true,
  startTime: true,
  endTime: true,
  jobType: true,
  notes: true
} satisfies Prisma.BookingSelect;

export type CreateBookingDto = Prisma.BookingGetPayload<{
  select: typeof createBookingDtoSelect;
}>;

export type UpdateBookingDto = Prisma.BookingGetPayload<{
  select: typeof updateBookingDtoSelect;
}>;

export type BookingDetailVm = Prisma.BookingGetPayload<{
  select: typeof bookingDetailViewModelSelect;
}>;

export type BookingListVm = Prisma.BookingGetPayload<{
  select: typeof bookingListViewModelSelect;
}>;

export type BookingVm = Prisma.BookingGetPayload<{
  select: typeof bookingViewModelSelect;
}>;
