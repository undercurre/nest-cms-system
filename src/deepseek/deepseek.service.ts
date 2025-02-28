import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class DeepseekService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      baseURL: 'https://one.devgaoy.cn/v1',
      apiKey: 'sk-GWhrMtZcPHGlfiemlLbiVGVlFGU8FcER2RUNq6Hf1iXJHIXM', // 替换为你的 DeepSeek API Key
    });
  }

  async getCompletion(
    messages: { role: any; content: string; name?: string }[],
  ): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      messages,
      model: 'deepseek-chat',
    });

    return completion.choices[0].message.content;
  }

  async getAiStream(messages: { role: any; content: string; name?: string }[]) {
    const completion = await this.openai.chat.completions.create({
      messages,
      model: 'deepseek-v3',
      stream: true,
    });

    return completion;
  }
}
