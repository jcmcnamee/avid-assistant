import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit
} from '@remix-run/react';
import { format, startOfToday } from 'date-fns';
import { useState } from 'react';
import { LuArrowBigLeft, LuCheck, LuHourglass } from 'react-icons/lu';
import DatePickerProvider from '~/hooks/useDatepicker';
import { BookingVm } from '~/models/BookingModels';
import Button from '~/UI/Button';
import DatePicker from '~/UI/DatePicker/DatePicker';
import { DateRange } from '~/UI/DatePicker/DateRange';
import Modal from '~/UI/Modal';
import { action, loader } from './route';

type BookingFormProps = {
  machineId: string;
  userId: string;
};

export default function BookingForm({ machineId, userId }: BookingFormProps) {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();
  const validationErrors = useActionData<typeof action>();
  const submit = useSubmit();
  const { state } = useNavigation();

  const isSubmitting = state !== 'idle';

  const bookings: BookingVm[] = loaderData.map(booking => ({
    ...booking,
    startTime: new Date(booking.startTime),
    endTime: new Date(booking.endTime)
  }));

  function handleClose() {
    navigate('..');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const day = format(dateRange!.start, 'yyyy-MM-dd');

    const updatedFormData = {
      ...formData,
      startTime: `${day}T${formData.startTime}:00`,
      endTime: `${day}T${formData.endTime}:00`,
      machineId: machineId,
      userId: userId
    };

    submit(updatedFormData, { method: 'POST' });
  }

  function handleSelectDates(booking: DateRange) {
    setDateRange(booking);
  }

  return (
    <Modal onClose={handleClose}>
      <div className="mb-4 border-b-[1px] border-slate-400">
        <h1 className="text-lg font-medium">Book machine</h1>
      </div>
      {!dateRange?.start ? (
        <DatePickerProvider>
          <DatePicker
            startDate={startOfToday()}
            bookings={bookings}
            onClick={handleSelectDates}
          />
        </DatePickerProvider>
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
            <p className="col-span-2 h-4 text-red-500">
              {validationErrors?.timeInterval && (
                <span>{validationErrors.timeInterval}</span>
              )}
            </p>
            <p>
              <label htmlFor="job-type">Job:</label>
              <br />
              <select
                id="job-type"
                name="jobType"
                className="rounded-md px-2 text-xl invalid:border-2 invalid:border-red-500 focus:outline-indigo-400"
              >
                <option>Ingest</option>
                <option>Export</option>
                <option>Sync & Group</option>
                <option>Conform</option>
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
            {/* {validationErrors && (
              <ul>
                {Object.values(validationErrors).map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )} */}
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
                iconRight={
                  isSubmitting ? (
                    <LuHourglass />
                  ) : (
                    <LuCheck className="text-2xl" />
                  )
                }
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
}
