import { MetaFunction, SerializeFrom } from '@remix-run/node';
import {
  isRouteErrorResponse,
  json,
  Outlet,
  useLoaderData,
  useRouteError
} from '@remix-run/react';
import { MachineListVm } from '~/models/MachineModels';
import { getMachinesWithCurrentBooking } from '~/persistence/repositories/machines.server';
import isAnError from '~/utils/isAnError';
import { deserializeMachineList } from '~/utils/mappings.client';
import MachineCard from './MachineCard';

export default function MachineLayout() {
  const loaderData: SerializeFrom<MachineListVm[]> =
    useLoaderData<typeof loader>();

  const machines: MachineListVm[] = deserializeMachineList(loaderData);

  return (
    <>
      <div className="grid auto-rows-auto grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {machines.map((machine: MachineListVm, i: number) => (
          <MachineCard
            id={machine.id}
            title={machine.name}
            currentBooking={machine.bookings[0]}
            key={i}
          />
        ))}
      </div>
      <Outlet />
    </>
  );
}

export function meta(): MetaFunction {
  return [
    { title: 'Machines | Avid Assistant' },
    { name: 'description', content: 'Book a machine' }
  ];
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

export async function loader() {
  const machineList: MachineListVm[] = await getMachinesWithCurrentBooking();

  if (!machineList || machineList.length === 0) {
    throw json(
      { message: 'No machines found, please add some machines.' },
      { status: 402, statusText: 'No content' }
    );
  }

  return json(machineList);
}
