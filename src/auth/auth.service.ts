import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  register() {
    return {
      message: 'I am the register endpoint',
    };
  }
  login() {
    return {
      message: 'I am the login endpoint',
    };
  }
}
