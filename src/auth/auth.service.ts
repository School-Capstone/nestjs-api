import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    try {
      const { name, surname, email, password, avatar } = dto;
      const hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          surname,
          name,
          email,
          password: hash,
          avatar,
        },
      });
      delete user.password;

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      } else {
        throw error;
      }
    }
  }

  login() {
    return {
      message: 'I am the login endpoint',
    };
  }
}
