import { BookingVm } from '~/models/BookingModels';

type MachineCardBookingDetailsProps = {
  booking: BookingVm;
};

export default function MachineCardBookingDetails({
  booking
}: MachineCardBookingDetailsProps) {
  return (
    <div className="grid grid-cols-[60px_1fr] gap-1 rounded-md border-[1px] border-indigo-400 p-2">
      <div className="col-start-1">
        <p>Type:</p>
      </div>
      <div className="col-start-2">
        <p>{booking.jobType}</p>
      </div>
      <div className="col-start-1">
        <p>User:</p>
      </div>
      <div className="col-start-2">
        <p>{booking.userId}</p>
      </div>
      <div className="col-start-1">
        <p>Ends:</p>
      </div>
      <div className="col-start-2">
        <p>{String(booking.endTime)}</p>
      </div>
    </div>
  );
}
