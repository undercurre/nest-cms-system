export class CreateGuideDto {
  video: string;
  title: string; // 类别
  description: string; // 描述
}

export class UpdateGuideDto {
  video?: string;
  title?: string; // 类别
  description?: string; // 描述
}
