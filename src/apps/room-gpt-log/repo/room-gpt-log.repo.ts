import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoomGptLog } from '../entities/room-gpt-log.entity';

@Injectable()
export class RoomGptLogRepo extends Repository<RoomGptLog> {
  constructor(private dataSource: DataSource) {
    super(RoomGptLog, dataSource.createEntityManager());
  }
}
