import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuideController } from './guide.controller';
import { GuideService } from './guide.service';
import { Guide } from './entity/guide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guide])],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuideModule {}
