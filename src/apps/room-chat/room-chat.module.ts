import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomChatRepo } from './repo/room-chat.repo';
import { RoomChat } from './entities/room-chat.entity';
import { RoomChatController } from './room-chat.controller';
import { RoomChatService } from './room-chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomChatRepo])],
  controllers: [RoomChatController],
  providers: [RoomChatRepo, RoomChatService],
})
export class RoomChatModule {}
export const RoomChatEntities = [RoomChat];
