import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { IngredientService } from './ingredients.service';
import { CreateIngredientDto } from './dto/index';
import { Ingredient } from './entity/ingredients.entity';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  // 获取所有食材
  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientService.findAll();
  }

  // 获取某道菜的食材
  @Get('recipe/:recipeId')
  async findByRecipe(
    @Param('recipeId') recipeId: number,
  ): Promise<Ingredient[]> {
    return this.ingredientService.findByRecipe(recipeId);
  }

  // 创建食材
  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    return this.ingredientService.create(createIngredientDto);
  }

  // 删除食材
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.ingredientService.remove(id);
  }
}
