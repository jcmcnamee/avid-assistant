import { BookingListVm } from '~/models/BookingModels';

type BookingCardProps = {
  booking: BookingListVm;
};

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="flex w-full gap-4 rounded-lg border border-indigo-400 p-4">
      <div className="grid grid-cols-1 grid-rows-2 border">
        <h2>Machine: </h2>
        <p>{booking.machine.name}</p>
      </div>
      <div className="grid grid-cols-1 grid-rows-4">
        <h2>Start: </h2>
        <p>{`${booking.startTime}`}</p>
        <h2>End: </h2>
        <p>{`${booking.endTime}`}</p>
      </div>
      <div className="grid grid-cols-1 grid-rows-2">
        <h2>Notes: </h2>
        <p>{booking.notes}</p>
      </div>
    </div>
  );
}
