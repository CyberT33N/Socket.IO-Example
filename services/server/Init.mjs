/* ################ Controller ################ */
import ctrlSocket from '../../controller/socket.mjs';
import ctrlEndpoints from '../../controller/endpoints.mjs';
import ctrlLib from '../../controller/lib.mjs';

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


/** lib functions which are related to the init process of the express server */
class Lib {
  /** Monitor all server requests */
  checkRequests() {
    this.app.use((req, res, next)=>{
      const basename = path.basename(req?.url);
      const extname = path.extname(basename);
      if (extname) log(`The file ${basename} was requested`);
      else log(`The endpoint ${basename} was requested.`);
      next();
    }); // this.app.use((req, res, next)=>{
  }; // checkRequests(app){


  /**
   * Create express server and resolve after finished
   * @param {number} port - Port where we run our express server on.
   * @return {Promise<boolean>}
  */
  createServer(port) {return new Promise(resolve => {
    if (!port) throw new Error('Param port missing at method createServer()');
    this.server.listen(port, ()=>{resolve();});
  });}; // createServer() {


  /**
   * setup middleware for express app
   * @param {object} app - Express app
  */
  static createMiddleware(app) {
    app.use( bodyParser.json() );
  }; // createMiddleware(app){
}; // class Lib {


/** Init processes which are server related */
export class Init extends Lib {
  /**
    * Get website path from config.yml (getConfig).
      Create express server and import website.
      Connect Socket.io and init sockets.
      Create Listener to monitor all requests (checkRequests).
  */
  constructor() {
    super();
    ctrlLib.ads(); // advertisement console.log of author

    const config = ctrlLib.getConfig();
    const websitePath = config.server.website.path;

    this.app = express();
    this.server = http.createServer(this.app);
    this.app.use(express.static(websitePath));

    this.io = socketIO(this.server);
    ctrlSocket.rootConnect(this.io);

    this.checkRequests();

    if (!this.app || !this.server) {
      throw new Error('Can not create globals at Class Init');
    } // if (!this.app || !this.server || this.io) {
  }; // constructor(){


  /**
    * Install Middleware to our express app (middleWare).
      Start server (startServer).
      create Listener to monitor all requests (checkRequests).
      Start endpoints (startListener).
      Return Socket.io connection (this.io).
    * @param {number} port - Port where we run our express server on.
    * @param {object} server - HTTP Server
  */
  async startServer(port) {
    if (!port) throw new Error('Param port missing at method startServer()');

    Init.createMiddleware(this.app);

    await this.createServer(port);

    await ctrlEndpoints.startListener(this.app);

    return this.io;
  }; // async startServer(port) {
}; // class Init{
