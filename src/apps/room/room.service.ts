import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepo } from './repo/banners.repo';
import { PaginatedDto } from '../../common/dtos/pagenate.dto';
import { getPagingInfo, pagenateQuery } from 'src/common/query/pagenate.query';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepo)
    private repo: RoomRepo,
  ) {}

  async search(dto: PaginatedDto) {
    return await this.getRooms(dto);
  }

  async getRooms(dto: PaginatedDto) {
    const query = await pagenateQuery(Room, 'room', dto);
    const response = await getPagingInfo(query, dto.page, dto.limit, dto.sorts);
    response.response.result = await response.queryBuilder.getMany();
    return response.response;
  }

  async findOne(id: number): Promise<Room | null> {
    return await this.repo.findOne({ where: { id: id } });
  }
}
