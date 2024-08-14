import { PrismaClient } from '@prisma/client';
// import { machines } from './machines';

const prisma = new PrismaClient();

async function seed() {
  try {
    for (const machine of machines) {
      console.log('Seeding object: ', machine);
      await prisma.machine.create({ data: machine });
    }
  } catch (err) {
    console.error('Error seeding data: ', err);
  } finally {
    await prisma.$disconnect();
  }
}

const machines = [
  {
    name: 'Assist01',
    isHeadless: true
  },
  {
    name: 'Assist02',
    isHeadless: true
  },
  {
    name: 'Assist03',
    isHeadless: true
  },
  {
    name: 'Assist04',
    isHeadless: true
  },
  {
    name: 'Assist05',
    isHeadless: false
  },
  {
    name: 'Assist07',
    isHeadless: false
  },
  {
    name: 'Assist08',
    isHeadless: false
  }
];

seed();
