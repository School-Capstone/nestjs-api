import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <-- This global decorator means that the PrismaService will be available to all modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
