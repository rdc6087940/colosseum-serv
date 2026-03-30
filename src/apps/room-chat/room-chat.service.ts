import { Injectable } from '@nestjs/common';
import { PaginatedDto } from '../../common/dtos/pagenate.dto';
import { getPagingInfo, pagenateQuery } from 'src/common/query/pagenate.query';
import { RoomChatRepo } from './repo/room-chat.repo';
import { RoomChat } from './entities/room-chat.entity';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { UpdateRoomChatDto } from './dto/update-room-chat.dto';

@Injectable()
export class RoomChatService {
  constructor(private repo: RoomChatRepo) {}

  async search(dto: PaginatedDto) {
    return await this.getRoomChats(dto);
  }

  async getRoomChats(dto: PaginatedDto) {
    const query = await pagenateQuery(RoomChat, 'room_chat', dto, this.repo);
    const response = await getPagingInfo(query, dto.page, dto.limit, dto.sorts);
    response.response.result = await response.queryBuilder.getMany();
    return response.response;
  }

  async findOne(id: number): Promise<RoomChat | null> {
    return await this.repo.findOne({ where: { id: id }, relations: ['room'] });
  }

  async create(createDto: CreateRoomChatDto): Promise<RoomChat> {
    const result: RoomChat = await this.repo.save({
      ...new RoomChat(),
      ...createDto,
      room: { id: createDto.room_id },
    });
    return result;
  }

  async update(id: number, updateDto: UpdateRoomChatDto): Promise<RoomChat> {
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
