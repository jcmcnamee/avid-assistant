import { sliceStartVals } from './DatePickerHelpers';

type DayColMeasureProps = {
  colHourStart: number;
  colHourEnd: number;
  quantizeMinutes: number;
};

export default function DayColMeasure({
  colHourStart,
  colHourEnd,
  quantizeMinutes
}: DayColMeasureProps) {
  const hourMarkers: string[] = [];
  const numSegments = ((colHourEnd - colHourStart) * 60) / quantizeMinutes;

  for (let i = 0; i <= colHourEnd - colHourStart; i++) {
    hourMarkers[i] = `${colHourStart + i}:00`;
  }

  console.log('Hour markers: ', hourMarkers);

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
