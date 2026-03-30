import { Test, TestingModule } from '@nestjs/testing';
import { RoomGptLogService } from './room-gpt-log.service';

describe('RoomGptLogService', () => {
  let service: RoomGptLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomGptLogService],
    }).compile();

    service = module.get<RoomGptLogService>(RoomGptLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
