import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PostService } from './post.service';
import { GetUser, Roles } from '../auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { CreatePostDto, EditPostDto } from './dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('published')
  getPublishedPosts() {
    return this.postService.getPublishedPosts();
  }

  @Get(':id')
  getSinglePost(@Param('id') id: string) {
    return this.postService.getSinglePost(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  createPost(@GetUser('id') userId: string, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  editPost(@Param('id') postId: string, @Body() dto: EditPostDto) {
    return this.postService.editPost(postId, dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  deletePost(@Param() postId: string) {
    return this.postService.deletePost(postId);
  }
}
