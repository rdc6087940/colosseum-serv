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
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiBearerAuth('access-token')
@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiOperation({ summary: '채팅방 생성' })
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

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

  @ApiOperation({ summary: '채팅방 수정' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @ApiOperation({ summary: '채팅방 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
