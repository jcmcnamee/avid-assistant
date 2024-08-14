import { Machine } from '@prisma/client';
import { MetaFunction, TypedResponse } from '@remix-run/node';
import {
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError
} from '@remix-run/react';
import isAnError from '~/helpers/isAnError';
import { getMachines } from '~/persistence/repositories/machines.server';
import MachineCard from '~/UI/MachineCard';

export default function MachinesMain() {
  const machines = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-[1fr_6fr_1fr]">
      <div className="col-start-2 grid auto-rows-auto">
        {machines.map((machine: Machine, i: number) => (
          <MachineCard title={machine.name} status="Available" key={i} />
        ))}
      </div>
    </div>
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
  const machines = await getMachines();

  if (!machines || machines.length === 0) {
    throw json(
      { message: 'No machines found, please add some machines.' },
      { status: 402, statusText: 'No content' }
    );
  }
  return json(machines);
}
