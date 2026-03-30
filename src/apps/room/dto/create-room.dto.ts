import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';
import { RoomStatus } from '../interfaces/room.interface';

export class CreateRoomDto {
  @ApiProperty({ title: '채팅방 제목', example: '대한민국 이대로 괜찮은가' })
  @IsString()
  name: string;

  @ApiProperty({
    title: '채팅방 상태',
    example: 'PREPARE',
    description: 'PREPARE | ON_AIR | DONE | CANCEL',
  })
  @IsString()
  room_status: RoomStatus;

  @ApiProperty({
    title: '총 방문자 수',
    example: '30',
  })
  total_visit_num: number;

  @ApiProperty({
    title: '썸네일 링크',
    description: 'https://~~',
    example: 'https://~~',
  })
  @IsString()
  img_thumbnail: string;

  @ApiProperty({ example: new Date(), title: '시작일' })
  @IsDateString()
  start_at: string;

  @ApiProperty({ example: new Date(), title: '종료일' })
  @IsDateString()
  end_at: string;
}
