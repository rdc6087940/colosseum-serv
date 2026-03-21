import { ApiProperty } from '@nestjs/swagger';
export class PagingDto {
  // 페이지
  @ApiProperty({ type: Number, default: 1 })
  page: number;

  // 페이지당 결과 수 (1페이제 몇개 띄울건지)
  @ApiProperty({ type: Number, default: 10 })
  limit: number;

  // 페이지 범위
  @ApiProperty({ type: Number, default: 10 })
  range: number;
}
