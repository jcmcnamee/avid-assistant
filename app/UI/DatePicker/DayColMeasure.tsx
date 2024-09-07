import { sliceStartVals } from './DatePickerHelpers';
import { useDatePicker } from './useDatepicker';

export default function DayColMeasure() {
  const { columnHourStart, columnHourEnd } = useDatePicker();

  const hourMarkers: string[] = [];
  // const numSegments =
  //   ((columnHourEnd - columnHourStart) * 60) / intervalMinutes;

  for (let i = 0; i <= columnHourEnd - columnHourStart; i++) {
    hourMarkers[i] = `${columnHourStart + i}:00`;
  }

  return (
    <>
      <div className="col-start-1 row-start-2 grid h-96 w-12 grid-rows-48 justify-end">
        {hourMarkers.map((h, i) => (
          <span
            key={h}
            className={`col-start-1 text-xs ${sliceStartVals[i * 4]}`}
          >
            {h}
          </span>
        ))}
      </div>
    </>
  );
}
