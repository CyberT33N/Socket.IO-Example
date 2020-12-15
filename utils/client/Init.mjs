/* ################ lib ################ */
import fs from 'fs';

/* ################ TDD ################ */
import io from 'socket.io-client';

/* ################ Controller ################ */
import ctrlSocketIO from '../../controller/socketio.mjs';
import ctrlBot from '../../controller/bot.mjs';
import ctrlMongoDB from '../../controller/mongodb.mjs';
import ctrlExpose from '../../controller/utils/exposefunctions.mjs';
import ctrlServer from '../../controller/server.mjs';
import ctrlLib from '../../controller/lib.mjs';


/** Lib functions which will be related to setup Client Side Unit Tests. */
class Lib {
  /** Create Dev Sockets for client and partner and set them gobal */
  async createDevSockets() {
    const sockets = await ctrlSocketIO.createDevSockets(io);
    this.socketClient = sockets.client;
    this.socketPartner = sockets.partner;
  }; // async createDevSockets(){

  /**
   * Return Puppeteer page & client for cross file usage.
   * @return {object} - Puppeteer page & client
  */
  getPPTR() {return this.pptr;};


  /** Start Puppeteer and set page and client global */
  async startBrowser() {
    this.pptr = await ctrlBot.startBrowser();
    if (!this.pptr) throw new Error('Something went wrong we cant find pptr');
  }; // async startBrowser() {


  /**
   * Create socket listener 'connectRoom result' and wait for message.
   * After this we start Client Side Mocha Testing and callback before()
   * @param {string} name - Socket Listener name.
   * @param {object} socket - Socket where we create listener on.
   * @return {Promise}
  */
  startSocket(name, socket) {return new Promise(resolve => {
    socket.on(name, async roomDetails=>{
      socket.off(name);
      resolve();
    }); // socket.on(name, async roomDetails=>{
    socket.emit('room connect', this.devRoom);
  });}; // startSocket(name, socket) {
}; // class Lib {


/** Init Client Side Unit Tests. */
export class Init extends Lib {
  /** Create globals and use singletone design pattern. */
  constructor() {
    super();
    if (Init.instance == null) Init.instance = this;

    const config = ctrlLib.getConfig();
    const clientToken = config.test.user[0].token;
    this.devRoom = config.test.room;
    this.devPort = config.test.port;
    const devHost = config.test.host + ':' + this.devPort;
    this.clientSideURL = `${devHost}/test.html?usertoken=${clientToken}`;

    return Init.instance;
  }; // constructor(){


  /**
   * Init setup for client side testing
   * @param {createCallback} done
  */
  async create(done) {
    if ( !await ctrlMongoDB.connect() ) throw new Error('Error connect to DB');

    await this.startBrowser();

    await this.createDevSockets(io);

    // Create all puppeteer expose function
    await ctrlExpose.init(
        this.pptr,
        this.socketClient,
        this.socketPartner,
        await ctrlServer.startServer(this.devPort), // Create Dev Server
    );

    // This is for Unit Test 'Check for AMPM at CSS Selector .time'
    await this.startSocket('connectRoom result', this.socketClient);

    // open mocha.js client side testing
    await ctrlBot.openLink(this.pptr.page, this.clientSideURL);

    done();
  }; // async create(){


  /** Get HTML of the Client Side Mocha Unit Tests and write to client.html */
  async getMochaHTML() {
    const HTML = await this.pptr.page.evaluate(() => {
      return document.querySelector('#mocha').innerHTML;
    });

    const data = `
      <!DOCTYPE html>
      <html lang="en">
        <head><link rel="stylesheet" href="../css/lib/mocha.css"/></head>
        <body><div id="mocha" style="background: white;">${HTML}</div></body>
      </html>
    `;

    fs.writeFileSync('./website/report/client.html', data);
  }; // async getMochaHTML() {
}; // class Init {
