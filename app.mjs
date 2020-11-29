/*################ config.json ################*/
import fs from 'fs';
//import {default as fsWithCallbacks} from 'fs'
//const fsAsync = fsWithCallbacks.promises

const json_config = JSON.parse( fs.readFileSync('./admin/config.json', 'utf8') );

/*################ Socket.io ################*/
import socketIO from 'socket.io';

/*################ Express ################*/
import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import timeout from 'connect-timeout';
import http from 'http';
//import helmet from 'helmet';
//import morgan from 'morgan';
const app = express(),
     port = process.env.PORT || json_config.server.port,
   server = http.createServer(app),
       io = socketIO(server);

/*################ Node.js ################*/
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url),
       __dirname = dirname(__filename);
console.log( 'Current working directory: ' + __dirname );

/*################ Controller ################*/
import controllerSocketIO from './controller/socketio.mjs';
import controllerMongoDB from './controller/mongodb.mjs';
import controllerEndpoints from './controller/endpoints.mjs';
import controllerServer from './controller/server.mjs';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';



/*
 ████████████████████████████████████████████████████████████████████████████████
 */
 var ads = gradient('red', 'white').multiline([
        '',
        'Presented by',
        '████████╗██████╗ ██████╗ ███╗   ██╗',
        '╚══██╔══╝╚════██╗╚════██╗████╗  ██║',
        '   ██║    █████╔╝ █████╔╝██╔██╗ ██║',
        '   ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║',
        '   ██║   ██████╔╝██████╔╝██║ ╚████║',
        '   ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ Software'
 ].join('\n'));
 console.log(ads);
 console.log( '\nCheck my Github Profile: ' + chalk.white.bgGreen.bold(' github.com/CyberT33N ')  + '\n\n');
 console.log( gradient('white', 'black')('\n\n=======================================\n\n') );






(async()=>{
  // connect to MongoDB
  if( !await controllerMongoDB.connectMongoDB() ) return false;


  // setup middleware
  await controllerServer.middleWare(app, bodyParser, express);

  // set up website..
  app.use(express.static('./website'));

  // log all requests from server
  await controllerServer.checkRequests(app);

  // start express server
  await controllerServer.startServer(server, port);


  // start endpoint listener
  await controllerEndpoints.getUserDetailsListener(app);
  await controllerEndpoints.getRoomDetailsListener(app);


  // start main project
  controllerSocketIO.rootConnect(io);
})().catch(e=>{  log('ASYNC - app.mjs - MAIN - Error: ' + e)  });
