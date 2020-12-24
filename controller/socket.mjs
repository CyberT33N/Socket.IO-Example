import {Init} from '../services/socket/Init.mjs';
import {Room} from '../services/socket/Room.mjs';

export default {
  // ---- Init ----
  userConnect: async io=>{return await new Init().userConnect(io);},
  disconnectUser: socket=>{return new Init().disconnectUser(socket);},


  // ---- Room ----
  connectRoom: socket=>{return new Room().connectRoom(socket);},
  messageRoom: socket=>{return new Room().messageRoom(socket);},
};
