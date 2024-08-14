import { Machine } from '@prisma/client';
import { prisma } from '../prisma.server';
import fs from 'fs/promises';

export async function createMachine(machineData: Machine) {
  try {
    return await prisma.machine.create({
      data: {
        name: machineData.name,
        isHeadless: machineData.isHeadless
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getMachines() {
  const rawContent = await fs.readFile('./app/persistence/machines.json', {
    encoding: 'utf-8'
  });

  const data = JSON.parse(rawContent);
  const storedMachines = data.machines ?? [];
  return storedMachines;
}
