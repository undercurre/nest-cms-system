import { Ingredient } from 'src/ingredients/entity/ingredients.entity';
import { Step } from 'src/steps/entity/steps.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('cookbook')
export class Cookbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  time: number; // 用时

  @Column('int', { nullable: false })
  difficulty: number; // 难度

  @Column({ type: 'varchar', length: 50 })
  category: string; // 类别

  @Column({ type: 'text' })
  description: string; // 描述

  @Column({ type: 'text' })
  description_en: string; // 描述

  @Column({ nullable: true })
  image: string; // 图片

  @Column({ type: 'varchar', length: 50 })
  name: string; // 名字

  @Column({ type: 'varchar', length: 50 })
  name_en: string; // 名字

  @Column({ type: 'varchar', length: 50, nullable: true })
  taste: string | null; // 口味（如甜、辣等）

  @OneToMany(() => Step, (step) => step.recipe, {
    createForeignKeyConstraints: false,
    cascade: true,
  }) // 一对多关系
  steps: Step[]; // 步骤列表

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    createForeignKeyConstraints: false,
    cascade: true,
  }) // 一对多关系
  ingredients: Ingredient[]; // 食材列表

  @Column({ type: 'json', nullable: true })
  nutrition_info: object | null; // 营养成分（JSON格式存储，包含热量、脂肪等）

  @CreateDateColumn()
  createdAt: Date; // 创建时间
}
