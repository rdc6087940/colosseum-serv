import { Injectable } from '@nestjs/common';
import { PaginatedDto } from '../../common/dtos/pagenate.dto';
import { getPagingInfo, pagenateQuery } from 'src/common/query/pagenate.query';
import { RoomGptLogRepo } from './repo/room-gpt-log.repo';
import { RoomGptLog } from './entities/room-gpt-log.entity';
import { UpdateRoomChatDto } from '../room-chat/dto/update-room-chat.dto';
import { CreateRoomGptLogDto } from './dto/create-room-gpt-log.dto';

@Injectable()
export class RoomGptLogService {
  constructor(private repo: RoomGptLogRepo) {}

  async search(dto: PaginatedDto) {
    return await this.getRoomGptLogs(dto);
  }

  async getRoomGptLogs(dto: PaginatedDto) {
    const query = await pagenateQuery(
      RoomGptLog,
      'room_gpt_log',
      dto,
      this.repo,
    );
    const response = await getPagingInfo(query, dto.page, dto.limit, dto.sorts);
    response.response.result = await response.queryBuilder.getMany();
    return response.response;
  }

  async findOne(id: number): Promise<RoomGptLog | null> {
    return await this.repo.findOne({ where: { id: id }, relations: ['room'] });
  }

  async create(createDto: CreateRoomGptLogDto): Promise<RoomGptLog> {
    const result: RoomGptLog = await this.repo.save({
      ...new RoomGptLog(),
      ...createDto,
      room: { id: createDto.room_id },
    });
    return result;
  }

  async update(id: number, updateDto: UpdateRoomChatDto): Promise<RoomGptLog> {
    const result = await this.repo
      .createQueryBuilder()
      .update()
      .set({ ...updateDto, room: { id: updateDto.room_id } })
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
