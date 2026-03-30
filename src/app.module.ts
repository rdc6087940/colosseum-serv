import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './apps/room/room.module';
import { AppsMeta } from './apps/app.meta';
import { RoomChatModule } from './apps/room-chat/room-chat.module';
import { RoomGptLogModule } from './apps/room-gpt-log/room-gpt-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '52.78.194.14',
      port: 5432,
      username: 'colosseum',
      password: 'colosseum',
      database: 'colosseum',
      entities: [...AppsMeta.entities],
      synchronize: true,
      logging: true,
    }),
    RoomModule,
    RoomChatModule,
    RoomGptLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
