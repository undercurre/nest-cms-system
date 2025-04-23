export class CreateStepDto {
  step_number: number; // 步骤序号
  description: string; // 步骤描述
  description_en: string; // 步骤描述
  image_url?: string; // 步骤图片URL（可选）
  recipe_id: number; // 关联的菜谱ID
}
