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
        '$argon2i$v=19$m=16,t=2,p=1$d0ZMTk1UT1JnQ0JFV0FJaw$tb/6imlH6DfKUOw3QL1Y+A', // Password@123
      role: 'ADMIN',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      surname: 'SUDO',
      name: 'Admin',
      email: 'admin@gmail.com',
      password:
        '$argon2i$v=19$m=16,t=2,p=1$d0ZMTk1UT1JnQ0JFV0FJaw$tb/6imlH6DfKUOw3QL1Y+A', // Password@123
      role: 'ADMIN',
    },
  });

  const adventureCategory = await prisma.category.upsert({
    where: { name: 'Adventure' },
    update: {},
    create: {
      name: 'Adventure',
    },
  });

  const comedyCategory = await prisma.category.upsert({
    where: { name: 'Comedy' },
    update: {},
    create: {
      name: 'Comedy',
    },
  });

  await prisma.post.upsert({
    where: { title: 'The Lord of the Rings' },
    update: {},
    create: {
      title: 'The Lord of the Rings',
      teaser: 'An epic high fantasy novel',
      content:
        'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien.',
      authorId: admin.id,
      categories: {
        connect: [{ id: adventureCategory.id }, { id: comedyCategory.id }],
      },
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
