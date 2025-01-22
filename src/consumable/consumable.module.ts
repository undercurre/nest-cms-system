import { Module } from '@nestjs/common';
import { ConsumableService } from './consumable.service';
import { ConsumableController } from './consumable.controller';
import { Consumable } from './entities/consumable.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Consumable])],
  providers: [ConsumableService, Consumable],
  exports: [Consumable],
  controllers: [ConsumableController],
})
export class ConsumableModule {}
