import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  register(dto: RegisterDto) {
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
