import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConsumableService } from './consumable.service';
import { CreateConsumableDto, UpdateConsumableDto } from './dto/index';

@Controller('consumables')
export class ConsumableController {
  constructor(private readonly consumableService: ConsumableService) {}

  @Post()
  async create(@Body() createConsumableDto: CreateConsumableDto) {
    try {
      return await this.consumableService.create(createConsumableDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.consumableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.consumableService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateConsumableDto: UpdateConsumableDto,
  ) {
    return this.consumableService.update(id, updateConsumableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.consumableService.remove(id);
  }
}
