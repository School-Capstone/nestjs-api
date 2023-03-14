import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreationDto, CategoryParamsDto } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('all')
  getAllCategories() {
    return this.categoryService.fetchAllCategories();
  }

  @Get(':id')
  getSingleCategory(@Param('id') dto: CategoryParamsDto) {
    return this.categoryService.fetchSingleCategory(dto);
  }

  @Post()
  createCategory(@Body() dto: CategoryCreationDto) {
    return this.categoryService.createCategory(dto);
  }
}
