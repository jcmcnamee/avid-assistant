import { isBefore } from 'date-fns';
import { CreateBookingDto } from '~/models/BookingModels';
import { findOverlappingBookings } from './repositories/bookings.server';

export type ValidationErrors = {
  date?: string;
  timeInterval?: string;
};

async function isMachineAvailable(
  machineId: number,
  startDate: Date,
  endDate: Date
): Promise<boolean> {
  const overlappingBookings = await findOverlappingBookings(
    machineId,
    startDate,
    endDate
  );

  return overlappingBookings.length === 0;
}

function isValidTimeInterval(startDate: Date, endDate: Date) {
  return isBefore(startDate, endDate);
}

export async function validateBookingInput(booking: CreateBookingDto) {
  const validationErrors: ValidationErrors = {};
  console.log('Beginning input validation');

  // Validation stuff happens here
  const isAvailable = await isMachineAvailable(
    booking.machineId,
    booking.startTime,
    booking.endTime
  );

  if (!isAvailable) {
    validationErrors.date = 'Date overlaps with another.';
  }

  if (!isValidTimeInterval(booking.startTime, booking.endTime)) {
    validationErrors.timeInterval = 'End date cannot be before start date.';
  }

  if (Object.keys(validationErrors).length > 0) {
    console.log('Throwing error: ', validationErrors);
    throw validationErrors;
  }
}
