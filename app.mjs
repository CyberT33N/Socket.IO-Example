/* ################ Controller ################ */
import ctrlMongoDB from './controller/mongodb.mjs';
import ctrlLib from './controller/lib.mjs';
import ctrlServer from './controller/server.mjs';

/* ################ Logs ################ */
import log from 'fancy-log';

/* ################ Config ################ */
const config = ctrlLib.getConfig();
const port = process.env.PORT || config.server.port;


(async ()=>{
  if (await ctrlMongoDB.connect()) await ctrlServer.init(port);
})().catch(e=>{log('app.mjs - Catch error: ' + e);});
