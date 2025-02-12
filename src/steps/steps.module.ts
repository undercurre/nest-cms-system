import { Module } from '@nestjs/common';
import { StepsController } from './steps.controller';
import { StepService } from './steps.service';
import { Step } from './entity/steps.entity';
import { Cookbook } from 'src/cookbook/entities/cookbook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Step, Cookbook])], // 导入 Step 和 Recipe 实体
  controllers: [StepsController],
  providers: [StepService],
})
export class StepsModule {}
