import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Add it to your environment before starting the server.');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  const user = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {
      name: 'John Doe',
      password: 'change-me',
    },
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'change-me',
    },
  });

  console.log(user);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });