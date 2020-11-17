import socket from '../services/socketio.mjs';

export default {
  rootConnect: async (http)=>{ return await socket.rootConnect(http); }
}
