import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: 'dusabe@prisma.io' },
    update: {},
    create: {
      surname: 'DUSABE',
      name: 'Christian',
      email: 'dusabe@prisma.io',
      password:
        '$argon2i$v=19$m=16,t=2,p=1$d0ZMTk1UT1JnQ0JFV0FJaw$tb/6imlH6DfKUOw3QL1Y+A',
      role: 'ADMIN',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
