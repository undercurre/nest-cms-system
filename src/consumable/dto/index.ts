export class CreateConsumableDto {
  name: string;
  description?: string;
  model: string;
  imageUrl?: string;
  productLink?: string;
  productId: number; // 对应的产品ID（外键）
}

export class UpdateConsumableDto {
  name?: string;
  description?: string;
  model?: string;
  imageUrl?: string;
  productLink?: string;
  productId?: number; // 可更新产品ID
}
