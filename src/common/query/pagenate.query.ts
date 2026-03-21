import { BadRequestException } from '@nestjs/common';
import {
  Brackets,
  SelectQueryBuilder,
  getConnection,
  getRepository,
} from 'typeorm';
import { PaginatedDto } from '../dtos/pagenate.dto';
import * as _ from 'lodash';

export const pagenateQuery = async (
  entity: any,
  table_name: string,
  dto: PaginatedDto,
) => {
  let keyword = dto.keywords;
  let sort = dto.sorts;

  const repository = getRepository(entity);
  let queryBuilder = repository.createQueryBuilder(table_name);

  // keyword
  queryBuilder = await keywordingQuery(
    entity,
    table_name,
    queryBuilder,
    keyword,
  );
  // sort
  queryBuilder = await sortingQuery(entity, table_name, queryBuilder, sort);

  return queryBuilder;
};

// 유효검사
export function vaildQuery(p_entity, p_columns) {
  let column_property_name: string[] = [];
  const entityMetaData = getConnection().getMetadata(p_entity);
  entityMetaData.columns.forEach((item, idx) => {
    column_property_name[idx] = item['propertyName'];
  });
  for (let i = 0; i < p_columns.length; i++) {
    for (let j = 0; j < column_property_name.length; j++) {
      if (column_property_name[j] === p_columns[i]) break;
      // if (sors[i].column.includes('.')) break;
      if (j >= column_property_name.length - 1) {
        throw new BadRequestException(
          `Vaild Exception : '${p_columns[i]}'is not exist column by '${entityMetaData.name}' table.`,
        );
      }
    }
  }
  return true;
}

// 키워드
export async function keywordingQuery(
  p_entity,
  p_table_name,
  p_queryBuilder,
  p_keyword,
) {
  let keyword = p_keyword;
  if (!keyword || keyword === undefined || keyword.length <= 0)
    keyword = ['id,>,OR#0'];
  let keys: any = [];
  let validator: string[] = [];
  if (Array.isArray(keyword)) {
    keyword.forEach((item, idx) => {
      // keyword 앞부분
      const condition = item.substring(0, item.indexOf('#'));
      // keyword 부분
      const value = item.substring(item.indexOf('#') + 1);
      let type = 'null';
      let data;
      // 배열탐색(#[some,like,that])
      if (value[0] === '[' && value[value.length - 1] === ']') {
        type = 'array';
        data = String(value)
          .substring(1, value.length - 1)
          .split(',');
      } else if (value[0] === '(' && value[value.length - 1] === ')') {
        type = 'in';
        data = String(value).substring(1, value.length - 1);
      } else {
        // just keyword search
        data = value;
      }
      keys[idx] = {
        column: condition.split(',')[0],
        operator: condition.split(',')[1],
        relation: condition.split(',')[2],
        value: {
          type: type,
          data: data,
        },
      };
    });
  } else {
    const temp = String(keyword).split('#');
    const value = temp[1];
    let type = 'null';
    let data;
    // 배열탐색(#[some,like,that])
    if (value[0] === '[' && value[value.length - 1] === ']') {
      type = 'array';
      data = String(value)
        .substring(1, value.length - 1)
        .split(',');
      // in탐색(#('some','like','that'))
    } else if (value[0] === '(' && value[value.length - 1] === ')') {
      type = 'in';
      data = String(value).substring(1, value.length - 1);
    } else {
      // just keyword search
      data = value;
    }
    keys[0] = {
      column: temp[0].split(',')[0],
      operator: temp[0].split(',')[1],
      relation: temp[0].split(',')[2],
      value: {
        type: type,
        data: data,
      },
    };
  }

  keys.forEach((item, idx) => {
    validator[idx] = item.column;
  });

  keys.sort(function (a) {
    return a.relation.toUpperCase() === 'OR';
  });
  // if (!vaildQuery(p_entity, validator)) console.log('exception error');
  // keyword Exception
  p_queryBuilder.where(
    new Brackets((qb) => {
      keys.forEach((item) => {
        if (item.relation.toUpperCase() !== 'OR') return;
        switch (item.value.type) {
          case 'in':
            String(item.column).indexOf('.') === -1
              ? qb.orWhere(
                  `${p_table_name}.${item.column} IN (${item.value.data})`,
                )
              : qb.orWhere(`${item.column} IN (${item.value.data})`);
            break;
          case 'array':
            qb.orWhere(
              `'${item.value.data}' ${item.operator} ANY(${p_table_name}.${item.column})`,
            );
            break;
          default:
            String(item.column).indexOf('.') === -1
              ? qb.orWhere(
                  `${p_table_name}.${item.column} ${item.operator} '${item.value.data}'`,
                )
              : qb.orWhere(
                  `${item.column} ${item.operator} '${item.value.data}'`,
                );
            break;
        }
      });
    }),
  );
  keys.forEach((item) => {
    if (item.relation.toUpperCase() !== 'OR') {
      switch (item.value.type) {
        case 'in':
          String(item.column).indexOf('.') === -1
            ? p_queryBuilder.andWhere(
                `${p_table_name}.${item.column} IN (${item.value.data})`,
              )
            : p_queryBuilder.andWhere(`${item.column} IN (${item.value.data})`);
          break;
        case 'array':
          p_queryBuilder.andWhere(
            `'${item.value.data}' ${item.operator} ANY(${p_table_name}.${item.column})`,
          );
          break;
        default:
          String(item.column).indexOf('.') === -1
            ? p_queryBuilder.andWhere(
                `${p_table_name}.${item.column} ${item.operator} '${item.value.data}'`,
              )
            : p_queryBuilder.andWhere(
                `${item.column} ${item.operator} '${item.value.data}'`,
              );
          break;
      }
    }
  });
  return p_queryBuilder;
}

// 정렬
export async function sortingQuery(
  p_entity,
  p_table_name,
  p_queryBuilder,
  p_sort,
) {
  let sort = p_sort ?? [];
  // if (!sort || sort === undefined) sort = ['id,ASC'];
  let sors = [] as any;
  let validator: string[] = [];
  //sorts 배열로 안들어오는 경우 예외처리
  if (Array.isArray(sort)) {
    sort.forEach((item, idx) => {
      sors[idx] = {
        column: item.split(',')[0],
        order: item.split(',')[1],
      };
    });
  } else {
    sors[0] = {
      column: String(sort).split(',')[0],
      order: String(sort).split(',')[1],
    };
  }
  for (let i = 0; i < sors.length; i++) {
    validator[i] = sors[i].column;
  }
  // if (!vaildQuery(p_entity, validator)) console.log('exception error');
  // sort
  if (sors.length > 0) {
    sors.forEach((item) => {
      p_queryBuilder.addOrderBy(
        `${p_table_name}.${item.column}`,
        item?.order?.toUpperCase() === 'ASC' ? `ASC` : `DESC`,
      );
    });
  }
  return p_queryBuilder;
}

// 쿼리 결과에 따른 페이지 네이션
export async function getPagingInfo(
  p_queryBuilder,
  p_page,
  p_limit,
  p_range,
  is_raw?: Boolean,
) {
  let limit: number = p_limit || 10;
  let page: number = p_page || 0;
  let range: number = p_range || 0;

  const queryCount = await p_queryBuilder.getCount();
  const page_total = Math.ceil(limit <= 0 ? queryCount : queryCount / limit); //총 페이지 개수
  const page_cur: number = page > page_total ? page_total : page;
  const page_start = range * Math.floor(page_cur / range) + 1; //페이지 네비게이션 시작 번호
  const page_end_temp = range * (Math.floor(page_cur / range) + 1);
  const page_end = page_end_temp > page_total ? page_total : page_end_temp; //페이지 네비게이션 끝 번호

  const isNext = page_cur < page_total ? true : false;
  const isPrev = page_cur > 1 ? true : false;
  const response = {
    limit: Number(limit),
    total: queryCount,
    page_cur: Number(page_cur),
    page_total: page_total,
    page_start: page_start,
    page_end: page_end,
    is_next: isNext,
    is_prev: isPrev,
    page_range: Number(range),
    result: [],
  };

  if (!_.isNil(is_raw) && is_raw) {
    if (limit && limit > 0) p_queryBuilder.limit(limit);
    if (page && limit)
      p_queryBuilder.offset((page - 1) * limit < 0 ? 0 : (page - 1) * limit);
  }

  if (limit && limit > 0) p_queryBuilder.take(limit);
  if (page && limit)
    p_queryBuilder.skip((page - 1) * limit < 0 ? 0 : (page - 1) * limit);
  const queryBuilder = p_queryBuilder;
  return { response, queryBuilder };
}
