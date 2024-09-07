import { Booking } from '@prisma/client';
import { prisma } from '../prisma.server';
import { CreateBookingDto } from '~/models/BookingModels';

export async function createBooking(
  bookingData: CreateBookingDto
): Promise<Booking> {
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
