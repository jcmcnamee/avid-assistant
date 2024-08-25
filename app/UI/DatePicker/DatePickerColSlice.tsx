import { format, getHours } from 'date-fns';
import { sliceEndVals, sliceStartVals } from './DatePickerHelpers';
import { DateRange } from './DateRange';
import { MouseEvent } from 'react';

export type DatePickerColSliceProps = {
  status: 'available' | 'booked' | 'unavailable';
  start: number;
  end: number;
  booking: DateRange;
  onClick?: (booking: DateRange) => void;
};

export default function DatePickerColSlice({
  status,
  start,
  end,
  booking,
  onClick
}: DatePickerColSliceProps) {

  const handleActiveClick = () => {
    alert(`Start: ${start}, End: ${end}`);
  };

  if (status === 'available')
    return (
      <button
        onClick={() => onClick(booking)}
        className={`rounded-md border-indigo-100 hover:border-4 ${sliceStartVals[start]} ${sliceEndVals[end]}`}
      ></button>
    );

  if (status === 'booked')
    return (
      <div
        className={`rounded-md border-4 border-red-200 bg-red-400 text-[0.4rem] ${sliceStartVals[start]} ${sliceEndVals[end]}`}
      ></div>
    );

  if (status === 'unavailable') return <div className="bg-gray-500"></div>;
}
