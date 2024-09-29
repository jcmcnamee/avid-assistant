import { json } from '@remix-run/node';
import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';
import { BookingListVm } from '~/models/BookingModels';
import { getCurrentAndFutureBookings } from '~/persistence/repositories/bookings.server';
import isAnError from '~/utils/isAnError';
import BookingsList from './BookingsList';

export default function BookingsLayout() {
  return (
    <>
      <h1>Current bookings</h1>
      <BookingsList/>
      <Outlet />
    </>
  );
}

export async function loader() {
  const bookingList: BookingListVm[] = await getCurrentAndFutureBookings();

  if (!bookingList || bookingList.length === 0) {
    throw json(
      { message: 'No upcoming bookings found, please book a machine.' },
      { status: 402, statusText: 'No content' }
    );
  }

  return bookingList;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = 'Unknown error';
  if (isAnError(error)) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong</p>
      <p>{errorMessage}</p>
    </div>
  );
}
