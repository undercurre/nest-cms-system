import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { GuideService } from './guide.service';
import { Guide } from './entity/guide.entity';
import { UpdateGuideDto } from './dto';

@Controller('guide')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  // 获取所有指南
  @Get()
  async findAll(): Promise<Guide[]> {
    return this.guideService.findAll();
  }

  // 根据 id 获取指南
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Guide> {
    return this.guideService.findOne(id);
  }

  // 创建新指南
  @Post()
  async create(@Body() guide: Guide): Promise<Guide> {
    return this.guideService.create(guide);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGuideDto: UpdateGuideDto,
  ) {
    return this.guideService.update(Number(id), updateGuideDto);
  }

  // 删除指南
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.guideService.remove(id);
  }
}
