import { EntityRepository, Repository } from 'typeorm';
import { Room } from '../entities/room.entity';

@EntityRepository(Room)
export class RoomRepo extends Repository<Room> {}
