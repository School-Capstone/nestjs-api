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
    ]);
  }
}
