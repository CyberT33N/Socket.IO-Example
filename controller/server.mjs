import * as srv from '../services/server.mjs';

export default {

  startServer: async (server, port)=>{ return await srv.startServer(server, port); },

  checkRequests: async app=>{ return await srv.checkRequests(app); },

  middleWare: async (app, bodyParser, express)=>{ return await srv.middleWare(app, bodyParser, express); }

}
