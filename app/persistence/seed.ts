import { AppUser, PrismaClient } from '@prisma/client';
// import { machines } from './machines';

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Seeding machines...');
    for (const machine of machines) {
      await prisma.machine.create({ data: machine });
    }
    for (const user of users) {
      console.log(`Seeding user ${user.name}`);
      await prisma.appUser.create({ data: user });
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
  },
  {
    name: 'Assist09',
    isHeadless: false
  },
  {
    name: 'Assist10',
    isHeadless: false
  },
  {
    name: 'Assist11',
    isHeadless: false
  },
  {
    name: 'Assist12',
    isHeadless: false
  },
  {
    name: 'Assist13',
    isHeadless: false
  },
  {
    name: 'Assist14',
    isHeadless: false
  },
  {
    name: 'Assist15',
    isHeadless: false
  },
  {
    name: 'Assist16',
    isHeadless: false
  },
  {
    name: 'Assist17',
    isHeadless: false
  }
];

const users: AppUser[] = [
  {
    id: 1,
    name: 'James McNamee',
    email: 'jcmcnamee@hotmail.com',
    password: 'admin',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Kath Adam',
    email: '',
    password: 'password',
    role: 'user'
  }
];

seed();
