import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
        include: {
          favouritePosts: true,
          userPreference: true,
          writtenPosts: {
            select: {
              id: true,
              title: true,
              teaser: true,
              published: true,
              createdAt: true,
            },
          },
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      // TODO: what kind of error am I supposed to throw here? ForbiddenException or...
      return error;
    }
  }
}
