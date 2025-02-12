import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cookbook } from 'src/cookbook/entities/cookbook.entity';

@Entity('ingredients') // 对应数据库中的 `ingredients` 表
export class Ingredient {
  @PrimaryGeneratedColumn() // 自增长的ID字段
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string; // 食材名称

  @Column({ type: 'varchar', length: 100, nullable: true })
  quantity: string | null; // 食材数量（如 200g、1个等）

  @ManyToOne(() => Cookbook, (recipe) => recipe.id, { onDelete: 'CASCADE' }) // 关联到 `Recipe` 表
  @JoinColumn({ name: 'recipe_id' })
  recipe: Cookbook; // 外键，关联菜谱ID
}
