import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

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

      return this.signToken(user.id, user.email);
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

  async login(dto: LoginDto) {
    try {
      const { email, password } = dto;

      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      const loginError = '🚨 Invalid credentials';
      if (!user) throw new ForbiddenException(loginError);
      const pwdMatch = await argon.verify(user.password, password);
      if (!pwdMatch) throw new ForbiddenException(loginError);

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
