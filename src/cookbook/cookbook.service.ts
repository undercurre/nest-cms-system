import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Cookbook } from './entities/cookbook.entity';
import { CreateCookbookDto, UpdateCookbookDto } from './dto';
import { Ingredient } from 'src/ingredients/entity/ingredients.entity';
import { Step } from 'src/steps/entity/steps.entity';

@Injectable()
export class CookbookService {
  constructor(
    @InjectRepository(Cookbook)
    private cookbookRepository: Repository<Cookbook>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  async create(createCookbookDto: CreateCookbookDto): Promise<Cookbook> {
    const { ingredients, steps, ...cookbookData } = createCookbookDto;

    // 创建 Cookbook
    const cookbook = this.cookbookRepository.create(cookbookData);

    // 创建关联的 Ingredients
    cookbook.ingredients = ingredients.map((ingredient) =>
      this.ingredientRepository.create(ingredient),
    );

    // 创建关联的 Steps
    cookbook.steps = steps.map((step) => this.stepRepository.create(step));

    // 保存 Cookbook 及其关联的 Ingredients 和 Steps
    return this.cookbookRepository.save(cookbook);
  }

  async findAll(): Promise<Cookbook[]> {
    return this.cookbookRepository.find({
      relations: ['ingredients', 'steps'],
      order: {
        id: 'ASC',
        ingredients: {
          id: 'ASC', // 按 ingredients.id 升序排序
        },
        steps: {
          step_number: 'ASC', // 按 steps.stepNumber 升序排序
        },
      },
    });
  }

  async findOne(id: number): Promise<Cookbook> {
    const cookbook = await this.cookbookRepository.findOne({ where: { id } });
    if (!cookbook) {
      throw new NotFoundException(`Cookbook with id ${id} not found`);
    }
    return cookbook;
  }

  async update(
    id: number,
    updateCookbookDto: UpdateCookbookDto,
  ): Promise<Cookbook> {
    const cookbook = await this.findOne(id);
    Object.assign(cookbook, updateCookbookDto);
    return this.cookbookRepository.save(cookbook);
  }

  async remove(id: number): Promise<void> {
    const cookbook = await this.findOne(id);
    await this.cookbookRepository.remove(cookbook);
  }

  // 搜索包含给定 name 的菜谱
  // 根据提供的搜索条件查询菜谱
  async search(query: {
    name?: string;
    difficulty?: number;
    category?: string;
    time?: number;
  }): Promise<Cookbook[]> {
    const { name, difficulty, category, time } = query;

    const whereClause: any = {};

    if (name) {
      whereClause.name = Like(`%${name}%`); // 模糊匹配 name
    }

    if (difficulty) {
      whereClause.difficulty = difficulty; // 精确匹配 difficulty
    }

    if (category) {
      whereClause.category = Like(`%${category}%`); // 模糊匹配 category
    }

    if (time) {
      whereClause.time = time; // 精确匹配 time
    }

    return this.cookbookRepository.find({
      where: whereClause,
    });
  }

  // 使用原生 SQL 查询执行 DISTINCT
  async distinctCategories(): Promise<string[]> {
    const result = await this.cookbookRepository.query(
      'SELECT DISTINCT category FROM cookbook',
    );
    // 返回分类数组
    return result.map((row) => row.category);
  }

  async distinctTaste(): Promise<string[]> {
    const result = await this.cookbookRepository.query(
      'SELECT DISTINCT taste FROM cookbook',
    );
    // 返回分类数组
    return result.map((row) => row.taste);
  }
}
