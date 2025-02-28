import { DeepseekGateway } from './deepseek.gateway';
import { Module } from '@nestjs/common';
import { DeepseekService } from './deepseek.service';
import { DeepseekController } from './deepseek.controller';

@Module({
  providers: [DeepseekService, DeepseekGateway],
  controllers: [DeepseekController],
})
export class DeepseekModule {}
