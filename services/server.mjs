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


export class Init {
  constructor() {log(`class Init - constructor()`);
    ctrlLib.ads(); // advertisement console.log of author

    this.app = express();
    this.server = http.createServer(this.app);

    this.app.use(express.static('./website')); // setup website

    const io = socketIO(this.server);
    ctrlSocketIO.rootConnect(io); // setup sockets
  }; // constructor(){

  async startServer(port) {log(`class Init - startServer() - port: ${port}`);
    await ctrlServer.middleWare(this.app, bodyParser, express);
    await ctrlServer.startServer(this.server, port);
    await ctrlServer.checkRequests(this.app); // monitor all requests
    await ctrlEndpoints.startListener(this.app);
  }; // async startServer(server, this.port) {
}; // class Init{
