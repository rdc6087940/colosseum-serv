import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { RoomStatus } from '../interfaces/room.interface';

@Entity('room')
export class Room extends BaseEntity {
  @Column({ type: 'varchar', length: 128, comment: '채팅방명' })
  name: string;

  @Column({ type: 'varchar', length: 32, comment: '채팅방 상태' })
  room_status: RoomStatus;

  @Column({ comment: '총 방문자 수' })
  total_visit_num: number;

  @Column({ type: 'text', comment: '썸네일 링크' })
  img_thumbnail: string;

  @Column({ type: 'timestamptz', comment: '시작일' })
  start_at: Date;

  @Column({ type: 'timestamptz', comment: '종료일' })
  end_at: Date;
}
