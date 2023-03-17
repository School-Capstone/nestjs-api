import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async getSinglePost(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });
    return post;
  }

  // async createPost() {
}
