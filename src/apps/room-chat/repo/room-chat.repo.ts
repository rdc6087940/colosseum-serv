import { DataSource, EntityRepository, Repository } from 'typeorm';
import { RoomChat } from '../entities/room-chat.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomChatRepo extends Repository<RoomChat> {
  constructor(private dataSource: DataSource) {
    super(RoomChat, dataSource.createEntityManager());
  }
}
