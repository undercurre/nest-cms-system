import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entity/ingredients.entity';
import { CreateIngredientDto } from './dto/index';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  // 获取所有食材
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  // 获取某道菜的所有食材
  async findByRecipe(recipeId: number): Promise<Ingredient[]> {
    return this.ingredientRepository.find({
      where: { recipe: { id: recipeId } },
    });
  }

  // 创建新的食材
  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create(createIngredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  // 删除食材
  async remove(id: number): Promise<void> {
    await this.ingredientRepository.delete(id);
  }
}
