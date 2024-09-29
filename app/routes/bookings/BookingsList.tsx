import { SerializeFrom } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BookingListVm } from '~/models/BookingModels';
import BookingCard from './BookingCard';
import { loader } from './route';

export default function BookingsList() {
  const loaderData: SerializeFrom<BookingListVm[]> =
    useLoaderData<typeof loader>();
  const bookings: BookingListVm[] = loaderData.map(b => ({
    ...b,
    startTime: new Date(b.startTime),
    endTime: new Date(b.endTime)
  }));

  return (
    <ul className="flex-col gap-2">
      {bookings.map((booking, i) => {
        return (
          <li key={i}>
            <BookingCard booking={booking} />
          </li>
        );
      })}
    </ul>
  );
}
