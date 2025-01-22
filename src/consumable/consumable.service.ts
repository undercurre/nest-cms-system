import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumable } from './entities/consumable.entity';
import { CreateConsumableDto, UpdateConsumableDto } from './dto/index';

@Injectable()
export class ConsumableService {
  constructor(
    @InjectRepository(Consumable)
    private readonly consumableRepository: Repository<Consumable>,
  ) {}

  async create(createConsumableDto: CreateConsumableDto): Promise<Consumable> {
    const consumable = this.consumableRepository.create(createConsumableDto);
    return this.consumableRepository.save(consumable);
  }

  async findAll(): Promise<Consumable[]> {
    return this.consumableRepository.find();
  }

  async findOne(id: number): Promise<Consumable> {
    const consumable = await this.consumableRepository.findOne({
      where: { id },
    });
    if (!consumable) {
      throw new NotFoundException('Consumable not found');
    }
    return consumable;
  }

  async update(
    id: number,
    updateConsumableDto: UpdateConsumableDto,
  ): Promise<Consumable> {
    const consumable = await this.consumableRepository.preload({
      id,
      ...updateConsumableDto,
    });
    if (!consumable) {
      throw new NotFoundException('Consumable not found');
    }
    return this.consumableRepository.save(consumable);
  }

  async remove(id: number): Promise<void> {
    const consumable = await this.consumableRepository.findOne({
      where: { id },
    });
    if (!consumable) {
      throw new NotFoundException('Consumable not found');
    }
    await this.consumableRepository.remove(consumable);
  }
}
