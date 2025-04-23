import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cookbook } from 'src/cookbook/entities/cookbook.entity';

@Entity('steps') // 对应数据库中的 `steps` 表
export class Step {
  @PrimaryGeneratedColumn() // 自增长的ID字段
  id: number;

  @Column({ type: 'int' })
  step_number: number; // 步骤序号

  @Column({ type: 'text' })
  description: string; // 步骤描述

  @Column({ type: 'text' })
  description_en: string; // 步骤描述

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string | null; // 步骤图片URL（如果有）

  @ManyToOne(() => Cookbook, (recipe) => recipe.id, { onDelete: 'CASCADE' }) // 关联到 `Recipe` 表
  @JoinColumn({ name: 'recipe_id' })
  recipe: Cookbook; // 外键，关联菜谱ID
}
