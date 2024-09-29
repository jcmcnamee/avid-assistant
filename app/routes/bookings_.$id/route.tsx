import { Booking } from '@prisma/client';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  SerializeFrom
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CreateBookingDto } from '~/models/BookingModels';
import {
  getBookingById,
  updateBooking
} from '~/persistence/repositories/bookings.server';
import {
  validateBookingInput,
  ValidationErrors
} from '~/persistence/validation.server';
import BookingForm from '~/UI/BookingForm';
import { deserializeBooking } from '~/utils/mappings.client';

export default function BookingLayout() {
  const loaderData: SerializeFrom<Booking> = useLoaderData<typeof loader>();
  const booking: Booking = deserializeBooking(loaderData);

  return (
    <div>
      <h1>Update booking</h1>
      <BookingForm
        machineId={booking.machineId}
        userId="1"
        bookingData={booking}
      />
    </div>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id: number = Number(params.id);
  const method: string = request.method;

  if (method === 'PUT') {
    // Get and sort form data
    const formData = Object.fromEntries(await request.formData());
    const bookingData: CreateBookingDto = {
      startTime: new Date(formData.startTime as string),
      endTime: new Date(formData.endTime as string),
      jobType: formData.jobType as string,
      notes: formData.notes as string,
      machineId: Number(id),
      userId: Number(formData.userId)
    };

    // Validate form data
    try {
      console.log('Trying to validate');
      await validateBookingInput(bookingData);
    } catch (err) {
      console.log('Caught error, returning error from action.');
      return err as ValidationErrors;
    }

    await updateBooking(id, bookingData);
  }

  return redirect('/machines');
}

export async function loader({ params }: LoaderFunctionArgs) {
  const booking = await getBookingById(Number(params.id));
  return booking;
}
