import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomGptLogRepo } from './repo/room-gpt-log.repo';
import { RoomGptLogController } from './room-gpt-log.controller';
import { RoomGptLogService } from './room-gpt-log.service';
import { RoomGptLog } from './entities/room-gpt-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomGptLogRepo])],
  controllers: [RoomGptLogController],
  providers: [RoomGptLogRepo, RoomGptLogService],
})
export class RoomGptLogModule {}
export const RoomGptLogEntities = [RoomGptLog];
