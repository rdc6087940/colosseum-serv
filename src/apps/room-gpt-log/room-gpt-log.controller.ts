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
import { RoomGptLogService } from './room-gpt-log.service';
import { UpdateRoomGptLogDto } from './dto/update-room-gpt-log.dto';
import { CreateRoomGptLogDto } from './dto/create-room-gpt-log.dto';

@ApiBearerAuth('access-token')
@ApiTags('room-gpt-log')
@Controller('room-gpt-log')
export class RoomGptLogController {
  constructor(private readonly roomGptLogService: RoomGptLogService) {}

  @ApiOperation({ summary: 'GPT 로그 생성' })
  @Post()
  create(@Body() createRoomGptLogDto: CreateRoomGptLogDto) {
    return this.roomGptLogService.create(createRoomGptLogDto);
  }

  @ApiOperation({ summary: 'GPT 로그 검색' })
  @Get()
  @Public()
  search(@Query() dto: PaginatedDto) {
    return this.roomGptLogService.search(dto);
  }

  @ApiOperation({ summary: 'GPT 로그 찾기' })
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.roomGptLogService.findOne(+id);
  }

  @ApiOperation({ summary: 'GPT 로그 수정' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomChatDto: UpdateRoomGptLogDto,
  ) {
    return this.roomGptLogService.update(+id, updateRoomChatDto);
  }

  @ApiOperation({ summary: 'GPT 로그 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomGptLogService.remove(+id);
  }
}
