import {Create} from '../../services/utils/socket/Create.mjs';


export default {
  // ---- Create ----
  testSocket: async (listenerName, socket, emitName, emitMsg)=>{
    return await new Create().testSocket(
        listenerName, socket, emitName, emitMsg,
    );
  },
  createDevSockets: io=>{return new Create().createDevSockets(io);},
};
