/* ################ Controller ################ */
import ctrlSocketIO from '../controller/socketio.mjs';
import ctrlEndpoints from '../controller/endpoints.mjs';
import ctrlServer from '../controller/server.mjs';
import ctrlLib from '../controller/lib.mjs';

/* ################ Socket.io ################ */
import socketIO from 'socket.io';

/* ################ Express ################ */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

/* ################ Node.js ################ */
import path from 'path';

/* ################ Logs ################ */
import log from 'fancy-log';


export const middleWare = (app, bodyParser, express)=>{
  app.use( bodyParser.json() ); // parse application/json
}; // export const middleWare = (app, bodyParser, express)=>{


export const startServer = (server, port)=>{return new Promise(resolve => {
  server.listen(port, async ()=>{
    log('Server was started.. Listening on port: ' + port);
    resolve(true);
  }); // server.listen(port, async ()=>{
});}; // export const startServer = (server, port)=>{


export const checkRequests = app => {log('---- checkRequests() ----');
  app.use((req, res, next)=>{
    const basename = path.basename(req?.url);
    const extname = path.extname(basename);
    if (extname) log(`The file ${basename} was requested`);// ```
    else log(`The endpoint ${basename} was requested.`);// ```
    next();
  }); // app.use((req, res, next)=>{
}; // export const checkRequests = app => {


/** Init processes which are server related */
export class Init {
  /**
    * Get website path from config.yml (getConfig).
      Create express server and import website.
      Connect Socket.io and init sockets.
  */
  constructor() {
    ctrlLib.ads(); // advertisement console.log of author

    const config = ctrlLib.getConfig();
    const websitePath = config.server.website.path;

    this.app = express();
    this.server = http.createServer(this.app);
    this.app.use(express.static(websitePath));

    const io = socketIO(this.server);
    ctrlSocketIO.rootConnect(io); // init sockets
  }; // constructor(){


  /**
    * Install Middleware to our express app (middleWare)
      Start server (startServer)
      create Listener to monitor all requests (checkRequests)
      Start endpoints (startListener)
    * @param {number} port - Port where we run our express server on.
  */
  async startServer(port) {
    await ctrlServer.middleWare(this.app, bodyParser, express);
    await ctrlServer.startServer(this.server, port);
    await ctrlServer.checkRequests(this.app);
    await ctrlEndpoints.startListener(this.app);
  }; // async startServer(port) {
}; // class Init{
