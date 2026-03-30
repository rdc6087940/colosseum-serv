import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Room } from 'src/apps/room/entities/room.entity';

@Entity('room_gpt_log')
export class RoomGptLog extends BaseEntity {
  @ManyToOne((type) => Room, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: Room;

  @Column({ type: 'varchar', comment: '응답 결과' })
  response: string;

  @Column({ type: 'varchar', comment: '상태값' })
  status: string;

  @Column({ type: 'varchar', comment: '응답결과 텍스트' })
  gtext: string;

  @Column({ type: 'varchar', comment: '입력 텍스트' })
  input_data: string;
}
