import { getDate, getMonth, getYear } from 'date-fns';
import { BookingVm } from '~/models/BookingModels';
import DateAvailableSegment from './DateAvailableSegment';
import DateBookedSegment from './DateBookedSegment';
import { invertDateRanges } from './DatePickerHelpers';
import { DateRange } from './DateRange';
import { useDatePicker } from './useDatepicker';

type DayColProps = {
  day: Date;
  bookings: BookingVm[];
  onClick: (booking: DateRange) => void;
};

export default function DayCol({ day, bookings = [], onClick }: DayColProps) {
  const { columnHourStart, columnHourEnd } = useDatePicker();

  const range = {
    start: new Date(getYear(day), getMonth(day), getDate(day), columnHourStart),
    end: new Date(getYear(day), getMonth(day), getDate(day), columnHourEnd)
  };

  const availableDates = invertDateRanges(
    bookings.map(b => ({ start: b.startTime, end: b.endTime })),
    { start: range.start, end: range.end }
  );

  // const availableDates: DateRange[] = [];

  return (
    <div
      className={`row-start-2 grid h-96 w-24 grid-cols-1 grid-rows-48 rounded-md border-4 border-gray-800 bg-indigo-400 shadow-xl`}
    >
      {bookings &&
        bookings.map((b, i) => (
          <DateBookedSegment
            key={`slice-${i}`}
            startDate={b.startTime}
            endDate={b.endTime}
            booking={b}
          />
        ))}
      {availableDates &&
        availableDates.map((d, i) => (
          <DateAvailableSegment
            key={`slice2-${i}`}
            startDate={d.start}
            endDate={d.end}
            handleClick={onClick}
          />
        ))}
    </div>
  );
}
