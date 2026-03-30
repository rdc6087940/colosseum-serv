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
import { RoomChatService } from './room-chat.service';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { UpdateRoomChatDto } from './dto/update-room-chat.dto';

@ApiBearerAuth('access-token')
@ApiTags('room-chat')
@Controller('room-chat')
export class RoomChatController {
  constructor(private readonly roomChatService: RoomChatService) {}

  @ApiOperation({ summary: '채팅 생성' })
  @Post()
  create(@Body() createRoomChatDto: CreateRoomChatDto) {
    return this.roomChatService.create(createRoomChatDto);
  }

  @ApiOperation({ summary: '채팅 검색' })
  @Get()
  @Public()
  search(@Query() dto: PaginatedDto) {
    return this.roomChatService.search(dto);
  }

  @ApiOperation({ summary: '채팅 찾기' })
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.roomChatService.findOne(+id);
  }

  @ApiOperation({ summary: '채팅 수정' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomChatDto: UpdateRoomChatDto,
  ) {
    return this.roomChatService.update(+id, updateRoomChatDto);
  }

  @ApiOperation({ summary: '채팅 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomChatService.remove(+id);
  }
}
