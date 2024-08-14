import { MetaFunction } from '@remix-run/node';
import {
  isRouteErrorResponse,
  json,
  Outlet,
  useLoaderData,
  useRouteError
} from '@remix-run/react';
import isAnError from '~/helpers/isAnError';
import { getMachines } from '~/persistence/repositories/machines.server';
import MachineCard from '~/UI/MachineCard';

export default function MachineLayout() {
  return <Outlet />;
}
