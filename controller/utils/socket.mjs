import {testSocket} from '../../services/utils/socket/testSocket.mjs';


export default {
  testSocket: async (listerName, socket, emitName, emitMsg)=>{
    return await testSocket(listerName, socket, emitName, emitMsg);
  },
};
