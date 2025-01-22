import { Test, TestingModule } from '@nestjs/testing';
import { ConsumableController } from './consumable.controller';

describe('ConsumableController', () => {
  let controller: ConsumableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumableController],
    }).compile();

    controller = module.get<ConsumableController>(ConsumableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
