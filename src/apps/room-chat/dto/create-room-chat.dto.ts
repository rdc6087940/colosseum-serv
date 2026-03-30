import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoomChatDto {
  @ApiProperty({ title: '채팅방 ID', example: 1, nullable: true })
  room_id: number;

  @ApiProperty({ title: '유저 IP', example: '128.00.11.22' })
  @IsString()
  user_ip: string;

  @ApiProperty({ title: '내용', example: '채팅 내용 예시 ~~' })
  @IsString()
  contents: string;

  @ApiProperty({ title: '유저명', example: '호랭이' })
  @IsString()
  user_name: string;
}
