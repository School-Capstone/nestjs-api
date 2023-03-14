import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryCreationDto, CategoryParamsDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async fetchAllCategories() {
    const categories = await this.prisma.category.findMany();
    return { categories };
  }

  async fetchSingleCategory(dto: CategoryParamsDto) {
    const { id } = dto;
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  }

  async createCategory(dto: CategoryCreationDto) {
    try {
      const { name } = dto;
      const category = await this.prisma.category.create({
        data: {
          name,
        },
      });
      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Category already exists');
        }
      } else {
        throw error;
      }
    }
  }
}
