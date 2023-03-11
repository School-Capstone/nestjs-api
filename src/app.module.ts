import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserRegistrationValidationMiddleware } from './auth/auth.middleware';

@Module({
  imports: [AuthModule, UserModule, PostModule, CategoryModule, PrismaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserRegistrationValidationMiddleware)
      .forRoutes('auth/register');
  }
}
