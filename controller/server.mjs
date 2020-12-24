import {Init} from '../services/server/Init.mjs';

export default {
  startServer: async port=>{return await new Init().startServer(port);},
}; // export default {
