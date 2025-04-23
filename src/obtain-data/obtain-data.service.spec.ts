import { Test, TestingModule } from '@nestjs/testing';
import { ObtainDataService } from './obtain-data.service';

describe('ObtainDataService', () => {
  let service: ObtainDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObtainDataService],
    }).compile();

    service = module.get<ObtainDataService>(ObtainDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
