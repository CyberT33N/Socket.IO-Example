/* ################ lib ################ */
import fs from 'fs';

/* ################ TDD ################ */
import expect from 'expect';
import io from 'socket.io-client';

/* ################ Controller ################ */
import ctrlSocketIO from '../../controller/socketio.mjs';
import ctrlBot from '../../controller/bot.mjs';
import ctrlMongoDB from '../../controller/mongodb.mjs';
import ctrlExpose from '../../controller/utils/exposefunctions.mjs';
import ctrlServer from '../../controller/server.mjs';
import ctrlLib from '../../controller/lib.mjs';

/* ################ Logs ################ */
import log from 'fancy-log';


let pptr;


describe('Client Side Services', ()=> {
  before(done=>{(async ()=>{
    await new Init().create(done);
  })().catch(e=>{log('client.test.mjs - BEFORE() - Error: ' + e);});});


  it('Client Side Test success. CSS selector .finish-test should exist', async()=>{
    expect(
      await pptr.page.waitForSelector('.finish-test', {visible: true, timeout:0})
    ).toBeTruthy();
  }); // it('Client Side Test success. CSS selector .finish-test should exist', async()=>{


  after(async()=>{await new Init().getMochaHTML();});
}); // describe('Client Side Services', ()=>{


/** Init Client Side Unit Tests. */
class Init {
  /** Create globals. */
  constructor() {
    const config = ctrlLib.getConfig();
    const clientToken = config.test.user[0].token;
    this.test_room = config.test.room;
    this.devPort = config.test.port;
    const devHost = config.test.host + ':' + this.devPort;
    this.clientSide_link = `${devHost}/test.html?usertoken=${clientToken}`;
  }; // constructor(){


  /**
   * Connect to MongoDB Database (ctrlMongoDB.connect).
     Create Dev Server on new Port (ctrlServer.startServer).
     Start Puppeteer and get page & client (ctrlBot.StartBrowser)
     Create Dev Sockets (ctrlSocketIO.createDevSockets)
     Create all expose function (ctrlExpose.init)
     Create socket listener 'connectRoom result'
   * @param {createCallback} done
  */
  async create(done) {
    if ( !await ctrlMongoDB.connect() ) throw new Error('Error connect to DB');


    const devIO = await ctrlServer.startServer(this.devPort);


    pptr = await ctrlBot.StartBrowser();
    if(!pptr) throw new Error('Something went wrong we cant find pptr');


    const sockets = await ctrlSocketIO.createDevSockets(io);
    const devSocket = sockets.devSocket;
    const devSocketPartner = sockets.devSocketPartner;


    await ctrlExpose.init(pptr, devSocket, devSocketPartner, devIO);


    devSocket.on('connectRoom result', async roomDetails=>{
      devSocket.off('connectRoom result');
      // open mocha.js client side testing
      await ctrlBot.openLink(pptr.page, this.clientSide_link);
      done();
    }); // devSocket.on('connectRoom result', roomDetails=>{

    devSocket.emit('room connect', this.test_room);
  }; // async create(){


  /** Get HTML of the Client Side Mocha Unit Tests and write to client.html */
  async getMochaHTML() {
    const HTML = await pptr.page.evaluate(() => {
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
