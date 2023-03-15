import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();

    prisma = app.get(PrismaService);

    await prisma.cleanDB();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(' 🚔 Auth', () => {
    describe(' 🧪 Register', () => {
      //
    });
    describe(' 🧪 Login', () => {
      //
    });
  });

  describe(' 🎭 User', () => {
    describe(' 🧪 Get me / Current User / Profile', () => {
      //
    });
    describe(' 🧪 Edit User', () => {
      //
    });
  });

  describe(' 🪂 Category', () => {
    describe(' 🧪 Get All Categories', () => {
      //
    });
    describe(' 🧪 Get Single Category', () => {
      //
    });
    describe(' 🧪 Create Category', () => {
      //
    });
    describe(' 🧪 Update Category', () => {
      //
    });
    describe(' 🧪 Delete Category', () => {
      //
    });
  });

  describe(' 📮 Post', () => {
    describe(' 🧪 Get All Posts', () => {
      //
    });
    describe(' 🧪 Get Single Post', () => {
      //
    });
    describe(' 🧪 Create Post', () => {
      //
    });
    describe(' 🧪 Update Post', () => {
      //
    });
    describe(' 🧪 Delete Post', () => {
      //
    });
  });
});
