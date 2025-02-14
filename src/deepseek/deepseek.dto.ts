import { IsString, IsNotEmpty } from 'class-validator';

export class AskQuestionDto {
  @IsNotEmpty()
  @IsString()
  json: string; // json字符串
}
