import {
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
import { Roles } from '../auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getSinglePost(@Param('id') id: string) {
    return this.postService.getSinglePost(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  createPost() {
    // return this.postService.createPost();
  }

  // TODO: update a post
  @Patch()
  editPost() {
    // return this.postService.editPost();
  }

  // TODO: delete a post
  @Delete()
  deletePost() {
    // return this.postService.deletePost();
  }
}
