export class CreateIngredientDto {
  name: string; // 食材名称
  name_en: string;
  quantity: string; // 食材数量（如 200g、1个等）
  recipe_id: number; // 关联的菜谱ID
}
