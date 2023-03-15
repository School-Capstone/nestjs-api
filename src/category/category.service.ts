import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async fetchAllCategories() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async fetchSingleCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
    return category;
  }

  async createCategory(dto: CategoryDto) {
    try {
      // TODO: add created at and updated at in the model
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

  async editCategory(id: string, dto: CategoryDto) {
    try {
      const { name } = dto;
      const category = await this.prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new ForbiddenException('Category does not exist');
          case 'P2002':
            throw new ForbiddenException('Category already exists');
          default:
            throw error;
        }
      } else {
        throw error;
      }
    }
  }

  async deleteCategory(id: string) {
    try {
      const category = await this.prisma.category.delete({
        where: {
          id,
        },
      });
      return category;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('Category does not exist');
        }
      } else {
        throw error;
      }
    }
  }
}
