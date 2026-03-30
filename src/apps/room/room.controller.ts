import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/rbac.decorator';
import { PaginatedDto } from 'src/common/dtos/pagenate.dto';
import { RoomService } from './room.service';

@ApiBearerAuth('access-token')
@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: '채팅방 검색' })
  @Get()
  @Public()
  search(@Query() dto: PaginatedDto) {
    return this.roomService.search(dto);
  }

  @ApiOperation({ summary: '채팅방 찾기' })
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }
}
