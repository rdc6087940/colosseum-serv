import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomRepo } from './repo/room.repo';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepo])],
  controllers: [RoomController],
  providers: [RoomRepo, RoomService],
})
export class RoomModule {}
export const RoomEntities = [Room];
