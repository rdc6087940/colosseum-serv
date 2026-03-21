import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ description: 'ID', example: 1 })
  @PrimaryGeneratedColumn({ comment: '고유 아이디' })
  id: number;

  @Index()
  @CreateDateColumn({ type: 'timestamptz', comment: '생성일' }) //
  created_at: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamptz', comment: '수정일' }) //
  updated_at: Date;
}
/*
1) PK로 쓰는 ID 외에 추가로 uuid를 기록하기 위해서 사용
@Column()
@Generated('uuid')
uuid: string

2) index
https://orkhan.gitbook.io/typeorm/docs/indices
*/
