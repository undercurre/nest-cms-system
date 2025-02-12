import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from './entity/steps.entity';
import { CreateStepDto } from './dto/index';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  // 获取所有步骤
  async findAll(): Promise<Step[]> {
    return this.stepRepository.find();
  }

  // 获取某道菜的所有步骤
  async findByRecipe(recipeId: number): Promise<Step[]> {
    return this.stepRepository.find({ where: { recipe: { id: recipeId } } });
  }

  // 创建步骤
  async create(createStepDto: CreateStepDto): Promise<Step> {
    const step = this.stepRepository.create(createStepDto);
    return this.stepRepository.save(step);
  }

  // 删除步骤
  async remove(id: number): Promise<void> {
    await this.stepRepository.delete(id);
  }
}
