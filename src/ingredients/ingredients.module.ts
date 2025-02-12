import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientService } from './ingredients.service';
import { Cookbook } from 'src/cookbook/entities/cookbook.entity';
import { Ingredient } from './entity/ingredients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Cookbook])], // 导入 Ingredient 和 Recipe 实体
  controllers: [IngredientsController],
  providers: [IngredientService],
})
export class IngredientsModule {}
