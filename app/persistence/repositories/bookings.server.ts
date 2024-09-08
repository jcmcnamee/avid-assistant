import { Booking } from '@prisma/client';
import { prisma } from '../prisma.server';
import { CreateBookingDto } from '~/models/BookingModels';

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

