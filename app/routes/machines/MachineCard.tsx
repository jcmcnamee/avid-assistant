import { Link } from '@remix-run/react';
import { LuBookOpenCheck, LuComputer, LuTimer } from 'react-icons/lu';
import Button from '../../UI/Button';
import { BookingVm } from '~/models/BookingModels';
import StatusIndicator from './StatusIndicator';

type MachineCardProps = {
  id: number;
  title: string;
  currentBooking?: BookingVm;
};

function MachineCard({ id, title, currentBooking }: MachineCardProps) {
  if (currentBooking) console.log(currentBooking);

  return (
    <div className="size-full overflow-hidden rounded-lg bg-indigo-300 p-4 shadow-md">
      <div className="flex place-content-between border-b-[1px] border-black pb-1">
        <h1 className="font-bold">{title}</h1>
        {currentBooking ? (
          <StatusIndicator
            booking={{
              start: currentBooking.startTime,
              end: currentBooking.endTime
            }}
          />
        ) : (
          <StatusIndicator />
        )}
      </div>
      <div className="mt-2 grid grid-cols-[1fr_2fr]">
        <div className="align flex items-center justify-center">
          <LuComputer className="size-24 text-indigo-500" />
        </div>
        <div className="flex flex-col justify-evenly gap-2 pl-4">
          <Link to={`./${id}/quick`} className="size-fit">
            <Button
              category="secondary"
              iconLeft={<LuTimer className="text-2xl" />}
            >
              Quick book
            </Button>
          </Link>
          <Link to={`./${id}/book`} className="size-fit">
            <Button
              category="primary"
              iconLeft={<LuBookOpenCheck className="text-2xl" />}
            >
              Book
            </Button>
          </Link>
          {currentBooking ? (
            <div>
              <p>{`Booked by: ${currentBooking.userId}`}</p>
              <p>{`Job: ${currentBooking.jobType}`}</p>
              <p>{`Notes: ${currentBooking.notes}`}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MachineCard;
