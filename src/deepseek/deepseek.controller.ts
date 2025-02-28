import { Body, Controller, Post } from '@nestjs/common';
import { DeepseekService } from './deepseek.service';
import { AskQuestionDto } from './deepseek.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@Controller('deepseek')
export class DeepseekController {
  constructor(private readonly deepseekService: DeepseekService) {}

  // WebSocket Server实例
  @WebSocketServer()
  server: Server;

  @Post('completion')
  async getCompletion(@Body() askQuestionDto: AskQuestionDto): Promise<string> {
    return this.deepseekService.getCompletion(JSON.parse(askQuestionDto.json));
  }
}
