import { Test, TestingModule } from '@nestjs/testing';
import { RoomGptLogController } from './room-gpt-log.controller';
import { RoomGptLogService } from './room-gpt-log.service';

describe('RoomGptLogController', () => {
  let controller: RoomGptLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomGptLogController],
      providers: [RoomGptLogService],
    }).compile();

    controller = module.get<RoomGptLogController>(RoomGptLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
