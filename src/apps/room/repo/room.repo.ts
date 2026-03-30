import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomRepo extends Repository<Room> {
  constructor(private dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }
}
