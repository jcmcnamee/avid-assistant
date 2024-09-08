/* eslint-disable no-useless-catch */
import { Machine } from '@prisma/client';
import { prisma } from '../prisma.server';
import { endOfDay, startOfDay } from 'date-fns';
import { MachineListVm } from '~/models/MachineModels';
import { bookingViewModel } from '~/models/BookingModels';

export async function createMachine(machineData: Machine) {
  try {
    return await prisma.machine.create({
      data: {
        name: machineData.name,
        isHeadless: machineData.isHeadless
      }
    });
  } catch (err) {
    throw err;
  }
}

// export async function getMachines() {
//   const rawContent = await fs.readFile('./app/persistence/machines.json', {
//     encoding: 'utf-8'
//   });

//   const data = JSON.parse(rawContent);
//   const storedMachines = data.machines ?? [];
//   return storedMachines;
// }

export async function getMachines(): Promise<MachineListVm[]> {
  const now = new Date();

  try {
    const machines = await prisma.machine.findMany({
      orderBy: {
        id: 'asc'
      },
      include: {
        bookings: {
          where: {
            startTime: {
              lte: now
            },
            endTime: {
              gte: now
            }
          },
          select: bookingViewModel.select
        }
      }
    });
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

export async function getMachineBookingsForDay(machineId: number, day: Date) {
  const dayStart = startOfDay(day);
  const dayEnd = endOfDay(day);

  const dailyBookings = await prisma.machine.findUniqueOrThrow({
    where: {
      id: machineId
    },
    select: {
      bookings: {
        where: {
          startTime: {
            gte: dayStart,
            lte: dayEnd
          }
        },
        orderBy: {
          startTime: 'asc'
        }
      }
    }
  });

  return dailyBookings;
}
