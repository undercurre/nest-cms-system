export class CreateProductDto {
  model: string;
  imageUrl?: string;
  sellingPoints?: string; // 可以存储为 JSON 字符串
  manualOssUrl?: string;
  createdBy: number; // 创建者用户ID
}

export class UpdateProductDto {
  model?: string;
  imageUrl?: string;
  sellingPoints?: string; // 可以存储为 JSON 字符串
  manualOssUrl?: string;
  createdBy?: number; // 修改创建者信息
}
