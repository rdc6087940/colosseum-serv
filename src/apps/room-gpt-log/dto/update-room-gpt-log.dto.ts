import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomGptLogDto } from './create-room-gpt-log.dto';

export class UpdateRoomGptLogDto extends PartialType(CreateRoomGptLogDto) {}
