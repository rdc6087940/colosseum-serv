import { ApiPropertyOptional } from '@nestjs/swagger';
import { PagingDto } from './paging.dto';
export class PaginatedDto extends PagingDto {
  @ApiPropertyOptional({
    type: [String],
    description: `[COLUMN_NAME, SORT_METHOD] (ex. ['id,DESC'])`,
  })
  sorts?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: `(ex. ['id,>=,OR#1'])`,
  })
  keywords?: string[];
}
