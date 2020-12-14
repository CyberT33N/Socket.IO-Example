/* ################ config.json ################ */
import fs from 'fs';
import {default as fsWithCallbacks} from 'fs';
const fsAsync = fsWithCallbacks.promises;

import yaml from 'js-yaml';
const json_config = yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8')),
     test_client1 = json_config.test.user[0],
     test_client2 = json_config.test.user[1],
        test_room = json_config.test.room,

          websitePath = json_config.server.website.path,

          devPort = json_config.test.port,

          devHost = json_config.test.host + ':' + devPort,

          devLink = devHost + '/?usertoken=' + test_client1.token,
   devLinkPartner = devHost + '/?usertoken=' + test_client2.token,
  clientSide_link = devHost + '/test.html?usertoken=' + test_client1.token;


/* ################ TDD ################ */
import expect from 'expect';
import io from 'socket.io-client';


/* ################ Controller ################ */
import ctrlSocketIO from '../controller/socketio.mjs';
import controllerBot from '../controller/bot.mjs';
import ctrlMongoDB from '../controller/mongodb.mjs';
import ctrlExpose from '../controller/utils/exposefunctions.mjs';
import ctrlServer from '../controller/server.mjs';

/* ################ Logs ################ */
import log from 'fancy-log';


let pptr;


describe('Client Side Services', ()=> {
  before(done=>{(async ()=>{
    if ( !await ctrlMongoDB.connect() ) throw new Error('Error connect to DB');


    // start dev server on new port
    const devIO = await ctrlServer.startServer(devPort);


    // start browser and get page & client
    pptr = await controllerBot.StartBrowser();
    if(!pptr) throw new Error('Something went wrong we cant find pptr');


    // get dev sockets
    const sockets = await ctrlSocketIO.createDevSockets(io);
    const devSocket = sockets.devSocket;
    const devSocketPartner = sockets.devSocketPartner;

    // load expose functions
    ctrlExpose.init(pptr, devSocket, devSocketPartner, devIO);


    // dont delete its for unit test: Check for AMPM at CSS Selector .time with Partner Toke
    devSocket.on('connectRoom result', async roomDetails=>{ //log('connectRoom result - Successfully connect - roomDetails: ' + JSON.stringify(roomDetails, null, 4));
      devSocket.off('connectRoom result');

      // open mocha.js client side testing
      await controllerBot.openLink(pptr.page, clientSide_link);

      done();
    }); // devSocket.on('connectRoom result', roomDetails=>{
    devSocket.emit('room connect', test_room);

  })().catch(e=>{  log('ASYNC - client.test.mjs - MAIN - Error: ' + e)  })}); // before



  it('Client Side Test success. CSS selector .finish-test should exist', async()=>{
    expect(
      await pptr.page.waitForSelector('.finish-test', {visible: true, timeout:0})
    ).toBeTruthy();
  }); // it('Client Side Test success. CSS selector .finish-test should exist', async()=>{

  after(async()=>{ await getMochaHTML(); }); // after(()=>{

}); // describe('Client Side Services', ()=>{





















const getMochaHTML = async()=>{ log( '---- getMochaHTML() ----' );
  fsAsync.writeFile('./website/report/client.html', `
  <!DOCTYPE html>
  <html lang="en">
    <head><link rel="stylesheet" href="../css/lib/mocha.css"/></head>
    <body><div id="mocha" style="background: white;">${await pptr.page.evaluate(() => {
      return document.querySelector('#mocha').innerHTML;
    })}</div></body>
  </html>`);
}; // const getMochaHTML = async()=>{
