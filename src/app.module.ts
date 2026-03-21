import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './apps/room/room.module';
import { AppsMeta } from './apps/app.meta';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
