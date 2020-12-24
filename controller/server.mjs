import {Init} from '../services/server/server.mjs';

export default {
  startServer: async port=>{return await new Init().startServer(port);},
}; // export default {
