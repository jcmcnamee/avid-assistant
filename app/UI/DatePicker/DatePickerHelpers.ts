import {
  endOfDay,
  getHours,
  getMinutes,
  isAfter,
  setHours,
  setMinutes,
  setSeconds
} from 'date-fns';
import { DateRange } from './DateRange';

export const sliceLengths = [
  'row-span-1',
  'row-span-2',
  'row-span-3',
  'row-span-4',
  'row-span-5',
  'row-span-6',
  'row-span-7',
  'row-span-8',
  'row-span-9',
  'row-span-10',
  'row-span-11',
  'row-span-12',
  'row-span-13',
  'row-span-14',
  'row-span-15',
  'row-span-16',
  'row-span-17',
  'row-span-18',
  'row-span-19',
  'row-span-20',
  'row-span-21',
  'row-span-22',
  'row-span-23',
  'row-span-24',
  'row-span-25',
  'row-span-26',
  'row-span-27',
  'row-span-28',
  'row-span-29',
  'row-span-30',
  'row-span-31',
  'row-span-32',
  'row-span-33',
  'row-span-34',
  'row-span-35',
  'row-span-36',
  'row-span-37',
  'row-span-38',
  'row-span-39',
  'row-span-40'
];

export const sliceStartVals = [
  'row-start-[1]',
  'row-start-[2]',
  'row-start-[3]',
  'row-start-[4]',
  'row-start-[5]',
  'row-start-[6]',
  'row-start-[7]',
  'row-start-[8]',
  'row-start-[9]',
  'row-start-[10]',
  'row-start-[11]',
  'row-start-[12]',
  'row-start-[13]',
  'row-start-[14]',
  'row-start-[15]',
  'row-start-[16]',
  'row-start-[17]',
  'row-start-[18]',
  'row-start-[19]',
  'row-start-[20]',
  'row-start-[21]',
  'row-start-[22]',
  'row-start-[23]',
  'row-start-[24]',
  'row-start-[25]',
  'row-start-[26]',
  'row-start-[27]',
  'row-start-[28]',
  'row-start-[29]',
  'row-start-[30]',
  'row-start-[31]',
  'row-start-[32]',
  'row-start-[33]',
  'row-start-[34]',
  'row-start-[35]',
  'row-start-[36]',
  'row-start-[37]',
  'row-start-[38]',
  'row-start-[39]',
  'row-start-[40]',
  'row-start-[41]',
  'row-start-[42]',
  'row-start-[43]',
  'row-start-[44]',
  'row-start-[45]',
  'row-start-[46]',
  'row-start-[47]',
  'row-start-[48]',
  'row-start-[49]'
];

export const sliceEndVals = [
  'row-end-[1]',
  'row-end-[2]',
  'row-end-[3]',
  'row-end-[4]',
  'row-end-[5]',
  'row-end-[6]',
  'row-end-[7]',
  'row-end-[8]',
  'row-end-[9]',
  'row-end-[10]',
  'row-end-[11]',
  'row-end-[12]',
  'row-end-[13]',
  'row-end-[14]',
  'row-end-[15]',
  'row-end-[16]',
  'row-end-[17]',
  'row-end-[18]',
  'row-end-[19]',
  'row-end-[20]',
  'row-end-[21]',
  'row-end-[22]',
  'row-end-[23]',
  'row-end-[24]',
  'row-end-[25]',
  'row-end-[26]',
  'row-end-[27]',
  'row-end-[28]',
  'row-end-[29]',
  'row-end-[30]',
  'row-end-[31]',
  'row-end-[32]',
  'row-end-[33]',
  'row-end-[34]',
  'row-end-[35]',
  'row-end-[36]',
  'row-end-[37]',
  'row-end-[38]',
  'row-end-[39]',
  'row-end-[40]',
  'row-end-[41]',
  'row-end-[42]',
  'row-end-[43]',
  'row-end-[44]',
  'row-end-[45]',
  'row-end-[46]',
  'row-end-[47]',
  'row-end-[48]',
  'row-end-[49]'
];

export const dayColLengthVals = [
  'grid-rows-[1]',
  'grid-rows-[2]',
  'grid-rows-[3]',
  'grid-rows-[4]',
  'grid-rows-[5]',
  'grid-rows-[6]',
  'grid-rows-[7]',
  'grid-rows-[8]',
  'grid-rows-[9]',
  'grid-rows-[10]',
  'grid-rows-[11]',
  'grid-rows-[12]',
  'grid-rows-[13]',
  'grid-rows-[14]',
  'grid-rows-[15]',
  'grid-rows-[16]',
  'grid-rows-[17]',
  'grid-rows-[18]',
  'grid-rows-[19]',
  'grid-rows-[20]',
  'grid-rows-[21]',
  'grid-rows-[22]',
  'grid-rows-[23]',
  'grid-rows-[24]',
  'grid-rows-[25]',
  'grid-rows-[26]',
  'grid-rows-[27]',
  'grid-rows-[28]',
  'grid-rows-[29]',
  'grid-rows-[30]',
  'grid-rows-[31]',
  'grid-rows-[32]',
  'grid-rows-[33]',
  'grid-rows-[34]',
  'grid-rows-[35]',
  'grid-rows-[36]',
  'grid-rows-[37]',
  'grid-rows-[38]',
  'grid-rows-[39]',
  'grid-rows-[40]',
  'grid-rows-[41]',
  'grid-rows-[42]',
  'grid-rows-[43]',
  'grid-rows-[44]',
  'grid-rows-[45]',
  'grid-rows-[46]',
  'grid-rows-[47]',
  'grid-rows-[48]',
  'grid-rows-[49]',
  'grid-rows-[50]',
  'grid-rows-[51]'
];

export function getColumnPosition(
  columnStartHour: number,
  columnEndHour: number,
  date: Date,
  quantizeMinutes: number
): number {
  let cleanedDate: Date = date;

  if (getHours(date) < columnStartHour) {
    cleanedDate = setHours(date, columnStartHour);
  }

  if (getHours(date) > columnEndHour) {
    cleanedDate = setHours(date, columnEndHour);
    cleanedDate = setMinutes(cleanedDate, 0);
    cleanedDate = setSeconds(cleanedDate, 0);
  }

  return (
    (getMinutesOfDay(cleanedDate) - columnStartHour * 60) / quantizeMinutes
  );
}

export function getMinutesOfDay(dateTime: Date): number {
  const hours = getHours(dateTime);
  const minutes = getMinutes(dateTime);
  const result = hours * 60 + minutes;

  return result;
}

export function invertBookings(
  day: Date,
  bookings: Array<DateRange>
): Array<DateRange> {
  const start = day;
  const end = endOfDay(day);
  const result: Array<DateRange> = [];
  let left = 0;
  let right = 0;

  if (bookings.length === 0) {
    return [{ start, end }];
  }

  while (bookings[left] != null) {
    if (right === 0) {
      if (isAfter(bookings[right].start, start)) {
        result.push({
          start,
          end: bookings[right].start
        });
      }
      right++;
    }

    if (bookings[right] != null) {
      if (isAfter(bookings[right].start, bookings[left].end)) {
        result.push({
          start: bookings[left].end,
          end: bookings[right].start
        });
        right++;
        left++;
      }
    } else {
      if (isAfter(end, bookings[left].end)) {
        result.push({
          start: bookings[left].end,
          end
        });
      }

      left++;
    }
  }

  return result;
}
