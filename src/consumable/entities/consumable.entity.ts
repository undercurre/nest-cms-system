import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Consumable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string; // 耗材的产品型号

  @Column()
  name: string; // 耗材的名称

  @Column({ type: 'text', nullable: true })
  description: string; // 耗材的描述

  @Column({ nullable: true })
  imageUrl: string; // 耗材的图片

  @Column({ nullable: true })
  productLink: string; // 耗材的产品链接

  @Column()
  productId: number; // 关联的产品
}
