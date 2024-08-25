import DatePickerColSlice from './DatePickerColSlice';
import { getColumnPosition, invertBookings } from './DatePickerHelpers';
import { DateRange } from './DateRange';

type DayColProps = {
  day: Date;
  colHourStart: number;
  colHourEnd: number;
  bookings: Array<DateRange>;
  onClick: (booking: DateRange) => void;
};

export default function DayCol({
  day,
  colHourStart,
  colHourEnd,
  bookings = [],
  onClick
}: DayColProps) {
  const invertedDates = invertBookings(day, bookings);

  return (
    <div
      className={`row-start-2 grid h-96 w-24 grid-cols-1 grid-rows-48 rounded-md border-4 border-gray-800 bg-indigo-400 shadow-xl`}
    >
      {bookings &&
        bookings.map((b, i) => (
          <DatePickerColSlice
            key={`slice-${i}`}
            status="booked"
            start={getColumnPosition(colHourStart, colHourEnd, b.start, 15)}
            end={getColumnPosition(colHourStart, colHourEnd, b.end, 15)}
            booking={b}
          />
        ))}
      {invertedDates &&
        invertedDates.map((d, i) => (
          <DatePickerColSlice
            key={`slice2-${i}`}
            status="available"
            start={getColumnPosition(colHourStart, colHourEnd, d.start, 15)}
            end={getColumnPosition(colHourStart, colHourEnd, d.end, 15)}
            booking={d}
            onClick={onClick}
          />
        ))}
    </div>
  );
}
