import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Room } from 'src/apps/room/entities/room.entity';

@Entity('room_chat')
export class RoomChat extends BaseEntity {
  @ManyToOne((type) => Room, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: Room;

  @Column({ type: 'varchar', length: 64, comment: '유저 IP' })
  user_ip: string;

  @Column({ type: 'varchar', comment: '내용' })
  contents: string;

  @Column({ type: 'varchar', length: 64, comment: '유저명' })
  user_name: string;
}
