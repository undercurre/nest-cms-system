import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookbookController } from './cookbook.controller';
import { CookbookService } from './cookbook.service';
import { Cookbook } from './entities/cookbook.entity';
import { Ingredient } from 'src/ingredients/entity/ingredients.entity';
import { Step } from 'src/steps/entity/steps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cookbook, Ingredient, Step])],
  controllers: [CookbookController],
  providers: [CookbookService],
})
export class CookbookModule {}
