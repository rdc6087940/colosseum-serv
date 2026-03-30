import { Injectable } from '@nestjs/common';
import { RoomRepo } from './repo/room.repo';
import { PaginatedDto } from '../../common/dtos/pagenate.dto';
import { getPagingInfo, pagenateQuery } from 'src/common/query/pagenate.query';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private repo: RoomRepo) {}

  async search(dto: PaginatedDto) {
    return await this.getRooms(dto);
  }

  async getRooms(dto: PaginatedDto) {
    const query = await pagenateQuery(Room, 'room', dto, this.repo);
    const response = await getPagingInfo(query, dto.page, dto.limit, dto.sorts);
    response.response.result = await response.queryBuilder.getMany();
    return response.response;
  }

  async findOne(id: number): Promise<Room | null> {
    return await this.repo.findOne({ where: { id: id } });
  }

  async create(createDto: CreateRoomDto): Promise<Room> {
    const result: Room = await this.repo.save({
      ...new Room(),
      ...createDto,
    });
    return result;
  }

  async update(id: number, updateDto: UpdateRoomDto): Promise<Room> {
    const result = await this.repo
      .createQueryBuilder()
      .update()
      .set({ ...updateDto })
      .where(`id=:id`, { id: id })
      .execute();
    return result.raw;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo
      .createQueryBuilder()
      .delete()
      .where(`id=:id`, { id: id })
      .execute();
    if (!result) return true;
    return false;
  }
}
