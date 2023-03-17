import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { LoginDto, RegisterDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

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
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDB();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await app.close();
  });

  describe(' 🚔 Auth', () => {
    const newUserDto: RegisterDto = {
      surname: 'DUSABE',
      name: 'Christian',
      email: 'dusabe@gmail.com',
      password: 'Password@123',
      confirm_password: 'Password@123',
    };

    const userDto: LoginDto = {
      email: 'dusabe@gmail.com',
      password: 'Password@123',
    };

    const adminDto: LoginDto = {
      email: 'admin@gmail.com',
      password: 'Password@123',
    };

    describe(' 🧪 Register', () => {
      it('should throw an error if no body is provided', async () => {
        return pactum.spec().post('/auth/register').expectStatus(400);
      });

      it('should throw an error if no surname is provided', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            name: newUserDto.name,
            email: newUserDto.email,
            password: newUserDto.password,
            confirm_password: newUserDto.confirm_password,
          })
          .expectStatus(400);
      });

      it('should throw an error if no name is provided', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            surname: newUserDto.surname,
            email: newUserDto.email,
            password: newUserDto.password,
            confirm_password: newUserDto.confirm_password,
          })
          .expectStatus(400);
      });

      it('should throw an error if no email is provided', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            surname: newUserDto.surname,
            name: newUserDto.name,
            password: newUserDto.password,
            confirm_password: newUserDto.confirm_password,
          })
          .expectStatus(400);
      });

      it('should throw an error if no password is provided', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            surname: newUserDto.surname,
            name: newUserDto.name,
            email: newUserDto.email,
            confirm_password: newUserDto.confirm_password,
          })
          .expectStatus(400);
      });

      it('should throw an error if no confirm_password is provided', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            surname: newUserDto.surname,
            name: newUserDto.name,
            email: newUserDto.email,
            password: newUserDto.password,
          })
          .expectStatus(400);
      });

      it('should throw an error if password and confirm_password do not match', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            surname: newUserDto.surname,
            name: newUserDto.name,
            email: newUserDto.email,
            password: newUserDto.password,
            confirm_password: 'Password@1234',
          })
          .expectStatus(400);
      });

      it('should throw an error if password fails regex pattern', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            surname: newUserDto.surname,
            name: newUserDto.name,
            email: newUserDto.email,
            password: '1234',
            confirm_password: '1234',
          })
          .expectStatus(400);
      });

      it('should throw an error if email already exists', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            surname: newUserDto.surname,
            name: newUserDto.name,
            email: 'admin@gmail.com',
            password: newUserDto.password,
            confirm_password: newUserDto.confirm_password,
          })
          .expectStatus(403);
      });

      it('should register a new user', async () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(newUserDto)
          .expectStatus(201);
      });
    });

    describe(' 🧪 Login', () => {
      it('should throw an error if no body is provided', async () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });

      it('should throw an error if no email is provided', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: userDto.password,
          })
          .expectStatus(400);
      });

      it('should throw an error if no password is provided', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: userDto.email,
          })
          .expectStatus(400);
      });

      it('should throw an error if invalid email is provided', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'invalid_email',
            password: userDto.password,
          })
          .expectStatus(400);
      });

      it('should throw an error if email does not exist', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: 'invalid@gmail.com',
            password: userDto.password,
          })
          .expectStatus(403);
      });

      it('should throw an error if password does not exist', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: userDto.email,
            password: 'invalid_password',
          })
          .expectStatus(403);
      });

      it('should login a user', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(userDto)
          .expectStatus(200)
          .stores('token', 'access_token');
      });

      it('should login an admin', async () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(adminDto)
          .expectStatus(200)
          .stores('admin_token', 'access_token');
      });
    });
  });

  describe(' 🎭 User', () => {
    describe(' 🧪 Get me / Current User / Profile', () => {
      it('should throw an error if no token is provided', async () => {
        return pactum.spec().get('/users/me').expectStatus(401);
      });

      it('should throw an error if an invalid token is provided', async () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer invalid_token' })
          .expectStatus(401);
      });

      it('should get the current user', async () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: `Bearer $S{token}` })
          .expectStatus(200);
      });
    });
    describe(' 🧪 Edit User', () => {
      const editUserDto: EditUserDto = {
        name: 'King Christian',
      };

      it('should throw an error if no token is provided', async () => {
        return pactum.spec().patch('/users/me').expectStatus(401);
      });

      it('should throw an error if an invalid token is provided', async () => {
        return pactum
          .spec()
          .patch('/users/me')
          .withHeaders({ Authorization: 'Bearer invalid_token' })
          .expectStatus(401);
      });

      it('should do nothing and return the user if no body is provided', async () => {
        return pactum
          .spec()
          .patch('/users/me')
          .withHeaders({ Authorization: `Bearer $S{token}` })
          .expectStatus(200);
      });

      it('should edit the current user', async () => {
        return pactum
          .spec()
          .patch('/users/me')
          .withHeaders({ Authorization: `Bearer $S{token}` })
          .withBody(editUserDto)
          .expectStatus(200)
          .expectBodyContains(editUserDto.name);
      });
    });
  });

  describe(' 🪂 Category', () => {
    describe(' 🧪 Get All Categories', () => {
      it('should get all categories', async () => {
        return pactum
          .spec()
          .get('/categories')
          .expectStatus(200)
          .stores('categoryId', 'id')
          .stores('categoryName', 'name');
      });
    });

    describe(' 🧪 Get Single Category', () => {
      it('should do nothing if id does not exist / not provided', async () => {
        return pactum.spec().get('/categories/123').expectStatus(200);
      });

      it('should get a single category', async () => {
        return pactum
          .spec()
          .get(`/categories/$S{categoryId}`)
          .expectStatus(200);
      });
    });

    describe(' 🧪 Create Category', () => {
      it('should throw an error if no token is provided', async () => {
        return pactum.spec().post('/categories').expectStatus(401);
      });

      it('should throw an error if an invalid token is provided', async () => {
        return pactum
          .spec()
          .post('/categories')
          .withHeaders({ Authorization: 'Bearer invalid_token' })
          .expectStatus(401);
      });

      it('should throw an error if the user is not an admin', async () => {
        return pactum
          .spec()
          .post('/categories')
          .withHeaders({ Authorization: 'Bearer $S{token}' })
          .expectStatus(403);
      });

      it('should throw an error if no body is provided', async () => {
        return pactum
          .spec()
          .post('/categories')
          .withHeaders({ Authorization: `Bearer $S{admin_token}` })
          .expectStatus(400);
      });

      it('should throw an error if name is empty', async () => {
        return pactum
          .spec()
          .post('/categories')
          .withHeaders({ Authorization: 'Bearer $S{admin_token}' })
          .withBody({ name: '' })
          .expectStatus(400);
      });

      it('should throw an error if the category already exists', async () => {
        return pactum
          .spec()
          .post('/categories')
          .withHeaders({ Authorization: 'Bearer $S{admin_token}' })
          .withBody({ name: 'Adventure' })
          .expectStatus(403);
      });

      it('should create a  new category', async () => {
        return pactum
          .spec()
          .post('/categories')
          .withHeaders({ Authorization: 'Bearer $S{admin_token}' })
          .withBody({ name: 'Sci-Fi' })
          .expectStatus(201)
          .expectBodyContains('Sci-Fi');
      });
    });

    describe(' 🧪 Update Category', () => {
      it('should throw an error if no token is provided', async () => {
        return pactum.spec().patch('/categories/123').expectStatus(401);
      });

      it('should throw an error if an invalid token is provided', async () => {
        return pactum
          .spec()
          .patch('/categories/123')
          .withHeaders({ Authorization: 'Bearer invalid_token' })
          .expectStatus(401);
      });

      it('should throw an error if the user is not an admin', async () => {
        return pactum
          .spec()
          .patch('/categories/123')
          .withHeaders({ Authorization: `Bearer $S{token}` })
          .expectStatus(403);
      });

      it('should throw an error if no body is provided', async () => {
        return pactum
          .spec()
          .patch('/categories/123')
          .withHeaders({ Authorization: `Bearer $S{admin_token}` })
          .expectStatus(400);
      });

      it('should throw an error if name is empty', async () => {
        return pactum
          .spec()
          .patch('/categories/123')
          .withHeaders({ Authorization: `Bearer $S{admin_token}` })
          .withBody({ name: '' })
          .expectStatus(400);
      });

      it('should throw an error if the category already exists', async () => {
        return pactum
          .spec()
          .patch('/categories/123')
          .withHeaders({ Authorization: `Bearer $S{admin_token}` })
          .withBody({ name: 'Adventure' })
          .expectStatus(403);
      });

      it('should update the category', async () => {
        return pactum
          .spec()
          .patch('/categories/$S{categoryId}')
          .withHeaders({ Authorization: `Bearer $S{admin_token}` })
          .withBody({ name: 'Fantasy' })
          .expectStatus(200)
          .expectBodyContains('Fantasy');
      });
    });

    describe(' 🧪 Delete Category', () => {
      it('should throw an error if no token is provided', async () => {
        return pactum.spec().delete('/categories/123').expectStatus(401);
      });

      it('should throw an error if an invalid token is provided', async () => {
        return pactum
          .spec()
          .delete('/categories/123')
          .withHeaders({ Authorization: 'Bearer invalid_token' })
          .expectStatus(401);
      });

      it('should throw an error if the user is not an admin', async () => {
        return pactum
          .spec()
          .delete('/categories/123')
          .withHeaders({ Authorization: `Bearer $S{token}` })
          .expectStatus(403);
      });

      it('should delete the category', async () => {
        return pactum
          .spec()
          .delete('/categories/$S{categoryId}')
          .withHeaders({ Authorization: `Bearer $S{admin_token}` })
          .expectStatus(200);
      });
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
