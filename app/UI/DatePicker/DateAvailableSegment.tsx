import {
  getColumnPosition,
  sliceEndVals,
  sliceStartVals
} from './DatePickerHelpers';
import { DateRange } from './DateRange';
import { useDatePicker } from './useDatepicker';

type DateAvailableSegmentProps = {
  startDate: Date;
  endDate: Date;
  handleClick: (booking: DateRange) => void;
};

export default function DateAvailableSegment({
  startDate,
  endDate,
  handleClick
}: DateAvailableSegmentProps) {
  const { columnHourStart, columnHourEnd, intervalMinutes } = useDatePicker();

  const rowStart = getColumnPosition(
    columnHourStart,
    columnHourEnd,
    startDate,
    intervalMinutes
  );
  const rowEnd = getColumnPosition(
    columnHourStart,
    columnHourEnd,
    endDate,
    intervalMinutes
  );

  return (
    <button
      className={`rounded-md border-indigo-100 hover:border-4 ${sliceStartVals[rowStart]} ${sliceEndVals[rowEnd]}`}
      onClick={() =>
        handleClick({
          start: startDate,
          end: endDate
        })
      }
    ></button>
  );
}
