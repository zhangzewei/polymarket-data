import { Test, TestingModule } from '@nestjs/testing';
import { ObtainDataController } from './obtain-data.controller';

describe('ObtainDataController', () => {
  let controller: ObtainDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObtainDataController],
    }).compile();

    controller = module.get<ObtainDataController>(ObtainDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
