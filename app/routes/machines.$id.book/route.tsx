import { createBooking } from '~/persistence/repositories/bookings.server';
import BookingForm from './BookingForm';
import { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect, useLoaderData, useParams } from '@remix-run/react';
import { CreateBookingDto } from '~/models/BookingModels';
import { getMachineBookings } from '~/persistence/repositories/machines.server';

export default function BookingFormPage() {
  const params = useParams();
  const bookings = useLoaderData<typeof loader>();

  return <BookingForm machineId={params.id!} userId="1" currentBookings={bookings} />;
}

export async function loader({ params }: ActionFunctionArgs) {
  const bookings = await getMachineBookings(params.id!.toString());
  console.log('Bookings: ', bookings);

  return json(bookings);
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  console.log(formData);

  const bookingData: CreateBookingDto = {
    startTime: new Date(formData.startTime as string),
    endTime: new Date(formData.endTime as string),
    jobType: formData.jobType as string,
    notes: formData.notes as string,
    machineId: Number(params.id),
    userId: Number(formData.userId)
  };
  console.log('Bloody booking data: ', bookingData);

  await createBooking(bookingData);
  return redirect('/machines');
}
