import { BookingVm } from '~/models/BookingModels';
import {
  getColumnPosition,
  sliceEndVals,
  sliceStartVals
} from './DatePickerHelpers';
import { useDatePicker } from '../../hooks/useDatepicker';

type DateAvailableSegmentProps = {
  startDate: Date;
  endDate: Date;
  booking: BookingVm;
};

export default function DateBookedSegment({
  startDate,
  endDate,
  booking
}: DateAvailableSegmentProps) {
  const { columnHourStart, columnHourEnd, intervalMinutes } = useDatePicker();

  const startPosition = getColumnPosition(
    columnHourStart,
    columnHourEnd,
    startDate,
    intervalMinutes
  );
  const endPosition = getColumnPosition(
    columnHourStart,
    columnHourEnd,
    endDate,
    intervalMinutes
  );

  const bookingInfo = `
  Start: ${startDate.toLocaleString()}
  End: ${endDate.toLocaleString()}
  Job: ${booking.jobType}
  User: ${booking.userId}
  Notes: ${booking.notes}
`;

  return (
    <button
      className={`rounded-md border-4 border-red-200 bg-red-400 text-[0.4rem] ${sliceStartVals[startPosition]} ${sliceEndVals[endPosition]}`}
      title={bookingInfo}
    ></button>
  );
}
