import * as _ from 'lodash';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export function leftJoinAndSelectWithAlias<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  tableName: string,
) {
  const alias = getAliasFromTableName(tableName);
  return query.leftJoinAndSelect(tableName, alias);
}

export function leftJoinAndSelectWithCondition<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  tableName: string,
  option?: { is_usable?: boolean; alias?: string },
) {
  const alias = option?.alias ?? getAliasFromTableName(tableName);
  const conditions: string[] = [];
  conditions.push(`${alias}.is_enabled = ${true}`);
  if (!_.isNil(option?.is_usable)) {
    conditions.push(`${alias}.is_usable = ${option?.is_usable}`);
  }
  const condition = conditions.join(' AND ');

  return query.leftJoinAndSelect(tableName, alias, condition);
}

function getAliasFromTableName(tableName: string) {
  const tableNames = tableName.split('.');
  return tableNames[tableNames.length - 1];
}
