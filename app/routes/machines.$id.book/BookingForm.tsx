import { Form, useNavigate } from '@remix-run/react';
import { format, parseISO, startOfToday } from 'date-fns';
import { useState } from 'react';
import { LuArrowBigLeft, LuCheck } from 'react-icons/lu';
import Button from '~/UI/Button';
import DatePicker from '~/UI/DatePicker/DatePicker';
import { DateRange } from '~/UI/DatePicker/DateRange';
import data from '~/UI/DatePicker/testData.json';
import Modal from '~/UI/Modal';

export default function BookingForm() {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const navigate = useNavigate();

  function handleClose() {
    navigate('..');
  }

  function handleSelectDates(booking: DateRange) {
    setDateRange(booking);
  }

  const bookingData = data.data.map(b => {
    return {
      start: parseISO(b.start),
      end: parseISO(b.end)
    };
  });

  console.log('Date range for form: ', dateRange);

  return (
    <Modal onClose={handleClose}>
      <div className="mb-4 border-b-[1px] border-slate-400">
        <h1 className="text-lg font-medium">Book machine</h1>
      </div>
      {!dateRange?.start ? (
        <DatePicker
          startDate={startOfToday()}
          numDays={5}
          bookings={bookingData}
          colHourStart={8}
          colHourEnd={20}
          onClick={handleSelectDates}
        />
      ) : (
        <>
          <Form className="grid grid-cols-2 gap-x-12 gap-y-4">
            <p className="col-start-1">
              <label htmlFor="start-date">Start</label>
              <br />
              <input
                className="rounded-md px-2 text-xl invalid:border-2 invalid:border-red-500 focus:outline-indigo-400"
                id="start-date"
                type="time"
                min={format(dateRange.start, 'HH:mm')}
                max={format(dateRange.end, 'HH:mm')}
                defaultValue={format(dateRange.start, 'HH:mm')}
                step="900"
              />
            </p>
            <p className="col-start-2">
              <label htmlFor="end-date">End</label>
              <br />
              <input
                className="rounded-md px-2 text-xl invalid:border-2 invalid:border-red-500 focus:outline-indigo-400"
                id="end-date"
                type="time"
                min={format(dateRange.start, 'HH:mm')}
                max={format(dateRange.end, 'HH:mm')}
                defaultValue={format(dateRange.end, 'HH:mm')}
                step="900"
              />
            </p>
            <p className="col-span-2 w-full">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                className="w-full rounded-md focus:border-4 focus:outline-indigo-400"
              />
            </p>
            <div>
              <Button
                type="button"
                onClick={() => setDateRange(null)}
                category="secondary"
                iconLeft={<LuArrowBigLeft className="text-2xl" />}
              >
                Go back
              </Button>
            </div>
            <div className="justify-self-end">
              <Button
                category="primary"
                iconRight={<LuCheck className="text-2xl" />}
              >
                Submit
              </Button>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
}
