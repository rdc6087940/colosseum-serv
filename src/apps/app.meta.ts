import { RoomChatEntities } from './room-chat/room-chat.module';
import { RoomGptLogEntities } from './room-gpt-log/room-gpt-log.module';
import { RoomEntities } from './room/room.module';

//----------------------------------------------------------------------------------------------------
export const AppsMeta = {
  module: [],
  entities: [...RoomEntities, ...RoomChatEntities, ...RoomGptLogEntities],
};
