import { Booking } from '@prisma/client';
import { Form, useNavigate, useSubmit } from '@remix-run/react';
import { format, parseISO, startOfToday } from 'date-fns';
import { useState } from 'react';
import { LuArrowBigLeft, LuCheck } from 'react-icons/lu';
import { BookingVm } from '~/models/BookingModels';
import Button from '~/UI/Button';
import DatePicker from '~/UI/DatePicker/DatePicker';
import { DateRange } from '~/UI/DatePicker/DateRange';
import data from '~/UI/DatePicker/testData.json';
import Modal from '~/UI/Modal';

type BookingFormProps = {
  machineId: string;
  userId: string;
  currentBookings: Booking;
};

export default function BookingForm({
  machineId,
  userId,
  currentBookings
}: BookingFormProps) {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const navigate = useNavigate();
  const submit = useSubmit();

  console.log('Current bookings: ', currentBookings);

  function handleClose() {
    navigate('..');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const day = format(new Date(), 'yyyy-MM-dd');

    const updatedFormData = {
      ...formData,
      startTime: `${day}T${formData.startTime}:00`,
      endTime: `${day}T${formData.endTime}:00`,
      machineId: machineId,
      userId: userId
    };

    console.log('Form data: ', formData);

    submit(updatedFormData, { method: 'POST' });
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

  return (
    <Modal onClose={handleClose}>
      <div className="mb-4 border-b-[1px] border-slate-400">
        <h1 className="text-lg font-medium">Book machine</h1>
      </div>
      {!dateRange?.start ? (
        <DatePicker
          startDate={startOfToday()}
          numDays={5}
          bookings={currentBookings.bookings}
          colHourStart={8}
          colHourEnd={20}
          onClick={handleSelectDates}
        />
      ) : (
        <>
          <Form
            method="POST"
            className="grid grid-cols-2 gap-x-12 gap-y-4"
            onSubmit={handleSubmit}
          >
            <p className="col-start-1">
              <label htmlFor="start-date">Start:</label>
              <br />
              <input
                className="rounded-md px-2 text-xl invalid:border-2 invalid:border-red-500 focus:outline-indigo-400"
                id="start-date"
                name="startTime"
                type="time"
                min={format(dateRange.start, 'HH:mm')}
                max={format(dateRange.end, 'HH:mm')}
                defaultValue={format(dateRange.start, 'HH:mm')}
                step="900"
              />
            </p>
            <p className="col-start-2">
              <label htmlFor="end-date">End:</label>
              <br />
              <input
                className="rounded-md px-2 text-xl invalid:border-2 invalid:border-red-500 focus:outline-indigo-400"
                id="end-date"
                name="endTime"
                type="time"
                min={format(dateRange.start, 'HH:mm')}
                max={format(dateRange.end, 'HH:mm')}
                defaultValue={format(dateRange.end, 'HH:mm')}
                step="900"
              />
            </p>
            <p>
              <label htmlFor="job-type">Job:</label>
              <select
                id="job-type"
                name="jobType"
                className="rounded-md px-2 text-xl invalid:border-2 invalid:border-red-500 focus:outline-indigo-400"
              >
                <option>Inest</option>
                <option>Export</option>
                <option>General</option>
              </select>
            </p>
            <p className="col-span-2 w-full">
              <label htmlFor="notes">Notes:</label>
              <textarea
                id="notes"
                name="notes"
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
