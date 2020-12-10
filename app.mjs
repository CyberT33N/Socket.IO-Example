/* ################ Controller ################ */
import ctrlMongoDB from './controller/mongodb.mjs';
import ctrlLib from './controller/lib.mjs';
import ctrlServer from './controller/server.mjs';

/* ################ Logs ################ */
import log from 'fancy-log';


(async ()=>{
  const config = ctrlLib.getConfig();
  const port = process.env.PORT || config.server.port;

  const r = await ctrlMongoDB.connectMongoDB();
  if (r) await ctrlServer.init(port);
})().catch(e=>{log('ASYNC - app.mjs - MAIN - Error: ' + e);});
