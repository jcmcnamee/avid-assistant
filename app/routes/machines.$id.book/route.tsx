import { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect, useParams } from '@remix-run/react';
import { BookingVm, CreateBookingDto } from '~/models/BookingModels';
import { createBooking } from '~/persistence/repositories/bookings.server';
import { getMachineBookings } from '~/persistence/repositories/machines.server';
import BookingForm from './BookingForm';

export default function BookingFormPage() {
  const params = useParams();

  return <BookingForm machineId={params.id!} userId="1" />;
}

export async function loader({ params }: ActionFunctionArgs) {
  const result = await getMachineBookings(params.id!.toString());

  const bookingVmList: BookingVm[] = result.bookings.map(b => ({
    startTime: b.startTime,
    endTime: b.endTime,
    jobType: b.jobType,
    notes: b.notes,
    machineId: b.machineId,
    userId: b.userId
  }));

  return bookingVmList;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  const bookingData: CreateBookingDto = {
    startTime: new Date(formData.startTime as string),
    endTime: new Date(formData.endTime as string),
    jobType: formData.jobType as string,
    notes: formData.notes as string,
    machineId: Number(params.id),
    userId: Number(formData.userId)
  };

  await createBooking(bookingData);
  return redirect('/machines');
}
