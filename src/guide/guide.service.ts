import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from './entity/guide.entity';
import { UpdateGuideDto } from './dto';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private readonly guideRepository: Repository<Guide>,
  ) {}

  // 获取所有指南
  async findAll(): Promise<Guide[]> {
    return this.guideRepository.find();
  }

  // 根据 id 获取指南
  async findOne(id: number): Promise<Guide> {
    const guide = await this.guideRepository.findOne({ where: { id } });
    if (!guide) {
      throw new NotFoundException(`Guide with id ${id} not found`);
    }
    return guide;
  }

  // 创建新指南
  async create(guide: Guide): Promise<Guide> {
    const newGuide = this.guideRepository.create(guide);
    return this.guideRepository.save(newGuide);
  }

  async update(id: number, updateGuideDto: UpdateGuideDto): Promise<Guide> {
    console.log('updating', id, typeof id, updateGuideDto);
    const product = await this.guideRepository.preload({
      id,
      ...updateGuideDto,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.guideRepository.save(product);
  }

  // 删除指南
  async remove(id: number): Promise<void> {
    const guide = await this.findOne(id);
    await this.guideRepository.remove(guide);
  }
}
