import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, EditPostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    const posts = await this.prisma.post.findMany({
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
    return posts;
  }

  async getPublishedPosts() {
    const posts = await this.prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
    return posts;
  }

  async getSinglePost(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
        favouritedBy: true,
      },
    });
    return post;
  }

  async createPost(userId: string, dto: CreatePostDto) {
    try {
      const { title, teaser, content, published, categories } = dto;
      const post = await this.prisma.post.create({
        data: {
          title,
          teaser,
          content,
          published,
          authorId: userId,
        },
      });

      const availableCategories = await this.prisma.category.findMany({
        where: {
          name: {
            in: categories.map((category) => category),
          },
        },
      });

      await this.prisma.post.update({
        where: { id: post.id },
        data: {
          categories: {
            connect: availableCategories.map((category) => ({
              id: category.id,
            })),
          },
        },
      });

      return post;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new ForbiddenException('Post already exists');
          default:
            throw error;
        }
      } else throw error;
    }
  }

  async editPost(postId: string, dto: EditPostDto) {
    try {
      const { title, teaser, content, published, categories } = dto;
      const post = await this.prisma.post.update({
        data: {
          title,
          teaser,
          content,
          published,
        },
        where: {
          id: postId,
        },
      });

      if (categories && categories.length) {
        const availableCategories = await this.prisma.category.findMany({
          where: {
            name: {
              in: categories.map((category) => category),
            },
          },
        });

        await this.prisma.post.update({
          where: { id: post.id },
          data: {
            categories: {
              connect: availableCategories.map((category) => ({
                id: category.id,
              })),
            },
          },
        });
      }

      return post;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new ForbiddenException('Post does not exist');
          case 'P2002':
            throw new ForbiddenException('Post already exists');
          default:
            throw error;
        }
      } else throw error;
    }
  }

  async deletePost(postId: string) {
    try {
      const post = await this.prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return post;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('Post does not exist');
        }
      } else {
        throw error;
      }
    }
  }
}
