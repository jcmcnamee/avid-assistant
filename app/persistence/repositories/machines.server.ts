import { Machine } from '@prisma/client';
import { prisma } from '../prisma.server';
import fs from 'fs/promises';
import { BookingVm } from '~/models/BookingModels';

export async function createMachine(machineData: Machine) {
  try {
    return await prisma.machine.create({
      data: {
        name: machineData.name,
        isHeadless: machineData.isHeadless
      }
    });
  } catch (err) {}
}

// export async function getMachines() {
//   const rawContent = await fs.readFile('./app/persistence/machines.json', {
//     encoding: 'utf-8'
//   });

//   const data = JSON.parse(rawContent);
//   const storedMachines = data.machines ?? [];
//   return storedMachines;
// }

export async function getMachines() {
  try {
    const machines = prisma.machine.findMany({ orderBy: { id: 'desc' } });
    return machines;
  } catch (err) {
    throw err;
  }
}

export async function getMachineBookings(id: string) {
  const machineBookings = prisma.machine.findUniqueOrThrow({
    where: {
      id: Number(id)
    },
    select: {
      bookings: {
        orderBy: {
          startTime: 'asc'
        }
      }
    }
  });

  return machineBookings;
}
