// import { PrismaClient } from '@prisma/client/extension';

// const prisma = new PrismaClient().$extends({
//   name: 'getCurrentBooking',
//   result: {
//     machine: {
//       currentBooking: {
//         needs: { bookings: true },
//         compute(machine) {
//           if (!machine.bookings) {
//             return null;
//           }

//           return prisma.machine.booking;
//         }
//       }
//     }
//   }
// });

// export { prisma };
