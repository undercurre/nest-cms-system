import { Consumable } from 'src/consumable/entities/consumable.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string; // 产品型号

  @Column()
  name: string; // 产品名称

  @Column({ nullable: true })
  imageUrl: string; // 产品图片

  @Column()
  sellingPoints: string; // 卖点，支持多个卖点

  @Column({ nullable: true })
  manualOssUrl: string; // 说明书的 OSS 地址

  @OneToMany(() => Consumable, (consumable) => consumable.product, {
    cascade: true,
  })
  consumables: Consumable[]; // 产品的耗材列表
}
