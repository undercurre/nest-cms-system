import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { StepService } from './steps.service';
import { CreateStepDto } from './dto/index';
import { Step } from './entity/steps.entity';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepService: StepService) {}

  // 获取所有步骤
  @Get()
  async findAll(): Promise<Step[]> {
    return this.stepService.findAll();
  }

  // 获取某道菜的所有步骤
  @Get('recipe/:recipeId')
  async findByRecipe(@Param('recipeId') recipeId: number): Promise<Step[]> {
    return this.stepService.findByRecipe(recipeId);
  }

  // 创建步骤
  @Post()
  async create(@Body() createStepDto: CreateStepDto): Promise<Step> {
    return this.stepService.create(createStepDto);
  }

  // 删除步骤
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.stepService.remove(id);
  }
}
