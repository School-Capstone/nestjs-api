import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CategoryService } from './category.service';
import { CategoryCreationDto, CategoryParamsDto } from './dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('all')
  getAllCategories() {
    return this.categoryService.fetchAllCategories();
  }

  // TODO: Decide whether to use params or query or body
  // ! Because validation is not working with params

  @Get(':id')
  getSingleCategory(@Param('id') dto: CategoryParamsDto) {
    return this.categoryService.fetchSingleCategory(dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  createCategory(@Body() dto: CategoryCreationDto) {
    return this.categoryService.createCategory(dto);
  }
}
