import { ApiProperty } from '@nestjs/swagger';
import { PagingDto } from './paging.dto';

export class TagSearchDto extends PagingDto {
  @ApiProperty({
    type: [String],
    description: '[COLUMN_NAME, SORT_METHOD]',
    example: ['id,DESC'],
  })
  sorts: string[];

  @ApiProperty({
    example: 'tags',
    default: 'tags',
  })
  column: string;

  @ApiProperty({
    type: [String],
    example: ['Anti-Aging', 'Filler'],
  })
  keywords: string[];
}
