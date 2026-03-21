import { SearchFormDto } from '../dtos/search.dto';
import { getPagingInfo, sortingQuery } from '../query/pagenate.query';
import { getRepository } from 'typeorm';
import { TagSearchDto } from '../dtos/tagsearch.dto';
export const searchQuery = async (
  entity: any,
  table_name: string,
  dto: SearchFormDto,
) => {
  let limit: number = dto.limit;
  let page: number = dto.page;
  let range: number = dto.range;
  limit = limit < 0 ? 0 : limit;
  page = page < 0 ? 1 : page;
  range = range < 0 ? 1 : range;
  const repository = getRepository(entity);
  const queryBuilder = repository.createQueryBuilder(table_name);

  return queryBuilder;
};

export const searchByTagQuery = async (
  entity: any,
  table_name: string,
  dto: TagSearchDto,
) => {
  let limit: number = dto.limit;
  let page: number = dto.page;
  let range: number = dto.range;
  limit = limit < 0 ? 0 : limit;
  page = page < 0 ? 1 : page;
  range = range < 0 ? 1 : range;

  if (!dto.column) dto.column = 'tags';
  const repository = getRepository(entity);
  let queryBuilder = repository.createQueryBuilder(table_name);

  queryBuilder.select('*');
  if (Array.isArray(dto.keywords)) {
    if (!(!dto.keywords[0] || dto.keywords[0] === undefined))
      for (let i = 0; i < dto.keywords.length; i++) {
        queryBuilder.andWhere(`'${dto.keywords[i]}' = ANY(${dto.column})`);
      }
  } else {
    if (!(!dto.keywords || dto.keywords === undefined))
      queryBuilder.andWhere(`'${dto.keywords}' = ANY(${dto.column})`);
  }
  queryBuilder = await sortingQuery(
    entity,
    table_name,
    queryBuilder,
    dto.sorts,
  );
  // const response = await getPagingInfo(queryBuilder, page, limit, range);

  return await getPagingInfo(queryBuilder, page, limit, range);
};
