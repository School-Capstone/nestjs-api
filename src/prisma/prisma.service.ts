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
    this.userPreference.deleteMany();
    this.category.deleteMany();
    this.post.deleteMany();
    this.user.deleteMany();
  }
}
