import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  cleanDB() {
    return this.$transaction([
      this.userPreference.deleteMany(),
      this.category.deleteMany(),
      this.post.deleteMany(),
      this.user.deleteMany(),
      this.user.create({
        data: {
          surname: 'SUDO',
          name: 'Admin',
          email: 'admin@gmail.com',
          password:
            '$argon2i$v=19$m=16,t=2,p=1$d0ZMTk1UT1JnQ0JFV0FJaw$tb/6imlH6DfKUOw3QL1Y+A',
          role: 'ADMIN',
        },
      }),
      this.category.create({
        data: {
          name: 'Adventure',
        },
      }),
      this.category.create({
        data: {
          name: 'Dytopian',
        },
      }),
      this.category.create({
        data: {
          name: 'Anime',
        },
      }),
      this.post.create({
        data: {
          title: 'The Lord of the Rings',
          teaser: 'An epic high fantasy novel',
          content:
            'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien.',
          author: {
            connect: {
              email: 'admin@gmail.com',
            },
          },
          categories: {
            connect: [
              { name: 'Adventure' },
              { name: 'Dytopian' },
              { name: 'Anime' },
            ],
          },
          published: true,
        },
      }),
    ]);
  }
}
