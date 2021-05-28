import { Test, TestingModule } from '@nestjs/testing';
import { RepairService } from './repair.service';

describe('RepairService', () => {
  let repair: RepairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepairService],
    }).compile();

    repair = module.get<RepairService>(RepairService);
  });

  it('should be defined', () => {
    expect(repair).toBeDefined();
  });
});
