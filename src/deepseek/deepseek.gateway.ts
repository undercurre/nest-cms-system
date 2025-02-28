import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DeepseekService } from './deepseek.service';
import { AskQuestionDto } from './deepseek.dto';

@WebSocketGateway(4001, { cors: { origin: '*' } }) // 这里设置 WebSocket 服务的端口
export class DeepseekGateway {
  constructor(private readonly deepseekService: DeepseekService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ask_question')
  async handleQuestion(
    @MessageBody() askQuestionDto: AskQuestionDto,
  ): Promise<void> {
    const response = await this.deepseekService.getAiStream(
      JSON.parse(askQuestionDto.json),
    );
    // 发送响应给发起请求的客户端
    const event = 'response';
    const stream = response;
    for await (let data of stream) {
      try {
        console.log('data:', data.choices[0].delta);
        console.log(
          'data-----------------------------------------------------------------------------------------------------------data',
        );
        this.server.emit('response', data);
      } catch (e) {
        console.log(e);
      }
    }

    this.server.emit('done', 'done');
  }
}
