/* ################ Controller ################ */
import controllerSocketIO from './controller/socketio.mjs';
import controllerMongoDB from './controller/mongodb.mjs';
import controllerEndpoints from './controller/endpoints.mjs';
import controllerServer from './controller/server.mjs';
import controllerLib from './controller/lib.mjs';

/* ################ Socket.io ################ */
import socketIO from 'socket.io';

/* ################ Express ################ */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

/* ################ Logs ################ */
import log from 'fancy-log';
import gradient from 'gradient-string';
import chalk from 'chalk';

const ads = gradient('red', 'white').multiline([
  '',
  'Presented by',
  '████████╗██████╗ ██████╗ ███╗   ██╗',
  '╚══██╔══╝╚════██╗╚════██╗████╗  ██║',
  '   ██║    █████╔╝ █████╔╝██╔██╗ ██║',
  '   ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║',
  '   ██║   ██████╔╝██████╔╝██║ ╚████║',
  '   ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ Software',
].join('\n'));
console.log(`
${ads}
Check my Github Profile:
${chalk.white.bgGreen.bold(' github.com/CyberT33N ')}
${gradient('white', 'black')('\n\n=======================================\n\n')}
`);


class Init {
  constructor() {
    const config = controllerLib.getConfig();
    this.app = express();
    this.port = process.env.PORT || config.server.port;
    this.server = http.createServer(this.app);

    this.app.use(express.static('./website')); // setup website

    const io = socketIO(this.server);
    controllerSocketIO.rootConnect(io); // setup sockets
  }; // constructor(){

  async startServer() {
    await controllerServer.middleWare(this.app, bodyParser, express);
    await controllerServer.startServer(this.server, this.port);
    await controllerServer.checkRequests(this.app); // monitor all requests
    await controllerEndpoints.startListener(this.app);
  }; // async startServer(server, this.port) {
}; // class Init{


(async ()=>{
  if (await controllerMongoDB.connectMongoDB()) await new Init().startServer();
})().catch(e=>{log('ASYNC - app.mjs - MAIN - Error: ' + e);});
