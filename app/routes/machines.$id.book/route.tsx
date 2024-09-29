import { ActionFunctionArgs } from '@remix-run/node';
import { redirect, useParams } from '@remix-run/react';
import { BookingVm, CreateBookingDto } from '~/models/BookingModels';
import { createBooking, updateBooking } from '~/persistence/repositories/bookings.server';
import { getMachineBookings } from '~/persistence/repositories/machines.server';
import BookingForm from '../../UI/BookingForm';
import {
  validateBookingInput,
  ValidationErrors
} from '~/persistence/validation.server';

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
  const id: number = Number(params.id);
  const method: string = request.method;

  if (method === 'POST' || method === 'PUT') {
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

    if (method === 'POST') {
      await createBooking(bookingData);
    }

    if (method === "PUT") {
      await updateBooking(id, bookingData);
    }
  }

  return redirect('/machines');
}
