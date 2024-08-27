import { addDays, format, isSameDay } from 'date-fns';
import { MouseEvent, useState } from 'react';
import DatePickerColTitle from './DatePickerColTitle';
import { DateRange } from './DateRange';
import DayCol from './DayCol';
import DayColMeasure from './DayColMeasure';
import { Booking } from '@prisma/client';

export default function DatePicker({
  startDate,
  numDays,
  colHourStart,
  colHourEnd,
  bookings,
  onClick
}: {
  startDate: Date;
  numDays: number;
  bookings: Array<Booking>;
  colHourStart: number;
  colHourEnd: number;
  onClick: (booking: Booking) => void;
}) {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="col-start-1 row-start-1"></div>
        <DayColMeasure
          colHourStart={colHourStart}
          colHourEnd={colHourEnd}
          quantizeMinutes={15}
        />
        {Array.from({ length: numDays }, (_, index) => (
          <>
            <DatePickerColTitle
              key={`title-${index}`}
              title={format(addDays(startDate, index), 'EEE dd')}
            />
            <DayCol
              key={`col-${index}`}
              day={addDays(startDate, index)}
              colHourStart={colHourStart}
              colHourEnd={colHourEnd}
              bookings={bookings.filter(b =>
                isSameDay(b.startTime, addDays(startDate, index))
              )}
              onClick={onClick}
            />
          </>
        ))}
      </div>
    </>
  );
}
