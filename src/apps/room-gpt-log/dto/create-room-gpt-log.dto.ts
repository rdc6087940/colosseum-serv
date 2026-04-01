import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoomGptLogDto {
  @ApiProperty({ title: '채팅방 ID', example: 1, nullable: true })
  room_id: number;

  @ApiProperty({ title: '응답 결과 IP', example: '{~~~}' })
  @IsString()
  response: string;

  @ApiProperty({ title: '상태값', example: 'DONE' })
  @IsString()
  status: string;

  @ApiProperty({ title: '응답결과 텍스트 테스트', example: 'GTEXT' })
  @IsString()
  gtext: string;

  @ApiProperty({ title: '입력 텍스트', example: '질문 1' })
  @IsString()
  input_data: string;
}
