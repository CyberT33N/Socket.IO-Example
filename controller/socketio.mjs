import * as socketIO from '../services/socketio.mjs';

export default {
  rootConnect: async io=>{ return await socketIO.rootConnect(io); },

  connectRoom: async socket=>{ return await socketIO.connectRoom(socket); },
  messageRoom: async socket=>{ return await socketIO.messageRoom(socket); },

  disconnectUser: async socket=>{ return await socketIO.disconnectUser(socket); },

  createDevSockets: async io_client=>{ return await socketIO.createDevSockets(io_client); }
}
