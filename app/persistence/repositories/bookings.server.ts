import { Booking } from '@prisma/client';
import {
  bookingDetailViewModelSelect,
  BookingDetailVm,
  bookingListViewModelSelect,
  BookingListVm,
  CreateBookingDto
} from '~/models/BookingModels';
import { prisma } from '../prisma.server';

export async function createBooking(
  bookingData: CreateBookingDto
): Promise<Booking> {
  // eslint-disable-next-line no-useless-catch
  try {
    return await prisma.booking.create({
      data: {
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        jobType: bookingData.jobType,
        notes: bookingData.notes,
        machineId: bookingData.machineId,
        userId: bookingData.userId
      }
    });
  } catch (err) {
    throw err;
  }
}

export async function getBookingById(id: number): Promise<Booking> {
  const booking: Booking = await prisma.booking.findUniqueOrThrow({
    where: { id }
  });

  return booking;
}

export async function findOverlappingBookings(
  machineId: number,
  startDate: Date,
  endDate: Date
): Promise<Booking[]> {
  const bookings = await prisma.booking.findMany({
    where: {
      machineId,
      AND: [{ startTime: { lt: endDate } }, { endTime: { gt: startDate } }]
    }
  });

  return bookings;
}

export async function getCurrentAndFutureBookings(): Promise<BookingListVm[]> {
  const now = new Date();

  const bookings = await prisma.booking.findMany({
    where: {
      OR: [
        {
          startTime: {
            gte: now
          }
        },
        {
          AND: [
            {
              startTime: { lte: now }
            },
            {
              endTime: { gte: now }
            }
          ]
        }
      ]
    },
    select: bookingListViewModelSelect
  });

  return bookings;
}

export async function updateBooking(id: number, bookingData: CreateBookingDto) {
  try {
    await prisma.booking.update({
      where: { id },
      data: {
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        jobType: bookingData.jobType,
        notes: bookingData.notes,
        machineId: bookingData.machineId,
        userId: bookingData.userId
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}
