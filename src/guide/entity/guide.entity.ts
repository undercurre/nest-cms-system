import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('guide')
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  video: string; // 图片

  @Column({ type: 'varchar', length: 50 })
  title: string; // 名字

  @Column({ type: 'text' })
  description: string; // 描述

  @CreateDateColumn()
  createdAt: Date; // 创建时间
}
