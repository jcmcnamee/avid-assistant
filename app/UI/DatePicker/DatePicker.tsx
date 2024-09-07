import { addDays, format, isSameDay } from 'date-fns';
import { Fragment } from 'react/jsx-runtime';
import { BookingVm } from '~/models/BookingModels';
import DatePickerColTitle from './DatePickerColTitle';
import { DateRange } from './DateRange';
import DayCol from './DayCol';
import DayColMeasure from './DayColMeasure';
import { useDatePicker } from './useDatepicker';

type DatePickerProps = {
  startDate: Date;
  bookings: BookingVm[];
  onClick: (booking: DateRange) => void;
};

export default function DatePicker({
  startDate,
  bookings,
  onClick
}: DatePickerProps) {
  const { numDays } = useDatePicker();

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="col-start-1 row-start-1"></div>
        <DayColMeasure />
        {Array.from({ length: numDays }, (_, index) => (
          <Fragment key={index}>
            <DatePickerColTitle
              key={`title-${index}`}
              title={format(addDays(startDate, index), 'EEE dd')}
            />
            <DayCol
              key={`col-${index}`}
              day={addDays(startDate, index)}
              bookings={bookings.filter(b =>
                isSameDay(b.startTime, addDays(startDate, index))
              )}
              onClick={onClick}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}
