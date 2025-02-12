import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CookbookService } from './cookbook.service';
import { CreateCookbookDto, UpdateCookbookDto } from './dto';

@Controller('cookbooks')
export class CookbookController {
  constructor(private readonly cookbookService: CookbookService) {}

  @Post()
  async create(@Body() createCookbookDto: CreateCookbookDto) {
    return this.cookbookService.create(createCookbookDto);
  }

  @Get()
  async findAll() {
    return this.cookbookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cookbookService.findOne(+id);
  }

  // 根据查询条件进行搜索
  @Get('/search/condition')
  async searchCookbooks(
    @Query('name') name?: string,
    @Query('time') time?: string,
    @Query('category') category?: string,
    @Query('difficulty') difficulty?: string,
  ) {
    // 将 string 转换为 number，确保它是有效的数字
    const parsedDifficulty = difficulty ? parseInt(difficulty, 10) : undefined;
    const parsedTime = time ? parseInt(time, 10) : undefined;

    // 检查是否是有效的数字，否则返回默认值（或忽略该查询条件）
    if (isNaN(parsedDifficulty) && difficulty !== undefined) {
      throw new Error('Invalid difficulty parameter');
    }

    if (isNaN(parsedTime) && time !== undefined) {
      throw new Error('Invalid time parameter');
    }

    return this.cookbookService.search({
      name,
      difficulty: parsedDifficulty,
      category,
      time: parsedTime,
    });
  }

  @Get('/list/categories')
  async getDistinctCategories() {
    return this.cookbookService.distinctCategories();
  }

  @Get('/list/taste')
  async getDistinctTaste() {
    return this.cookbookService.distinctTaste();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCookbookDto: UpdateCookbookDto,
  ) {
    return this.cookbookService.update(+id, updateCookbookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cookbookService.remove(+id);
  }
}
