import { ApiProperty } from '@nestjs/swagger';
import { PagingDto } from './paging.dto';

export class SearchFormDto extends PagingDto {
  @ApiProperty({
    type: [String],
    description: '[COLUMN_NAME, SORT_METHOD]',
    example: ['id,DESC'],
  })
  sorts: string[];
  @ApiProperty({ description: '검색 키워드', example: '테스트' })
  keyword: string;
}
