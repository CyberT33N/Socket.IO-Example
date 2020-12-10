/*################ config.json ################*/
import fs from 'fs';
import {default as fsWithCallbacks} from 'fs'
const fsAsync = fsWithCallbacks.promises

import yaml from 'js-yaml';
const json_config = yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8')),
     test_client1 = json_config.test.user[0],
     test_client2 = json_config.test.user[1],
        test_room = json_config.test.room,

          devPort = json_config.test.port,

          devHost = json_config.test.host + ':' + devPort,

          devLink = devHost + '/?usertoken=' + test_client1.token,
   devLinkPartner = devHost + '/?usertoken=' + test_client2.token,
  clientSide_link = devHost + '/test.html?usertoken=' + test_client1.token;


/*################ Express ################*/
import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import timeout from 'connect-timeout';
import http from 'http';
const devAPP = express(),
devServer = http.createServer(devAPP);

/*################ TDD ################*/
import expect from 'expect';
import socketIO from 'socket.io';
import io_client from 'socket.io-client';
const devIO = socketIO(devServer);

/*################ Controller ################*/
import controllerSocketIO from '../controller/socketio.mjs';
import controllerBot from '../controller/bot.mjs';
import controllerMongoDB from '../controller/mongodb.mjs';
import controllerEndpoints from '../controller/endpoints.mjs';
import controllerExpose from '../controller/utils/exposefunctions.mjs';
import controllerServer from '../controller/server.mjs';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';

var pptr;













describe('Client Side Services', ()=>{

  before(done=>{(async()=>{ log('\n\n---- client.test.mjs - BEFORE ----');

    // connect to MongoDB
    if( !await controllerMongoDB.connectMongoDB() ) throw new Error('Can not connect to MongoDB');

    // setup middleware
    await controllerServer.middleWare(devAPP, express);

    // set up website..
    devAPP.use(express.static('./website'));


    // log all requests from server
    //await controllerServer.checkRequests(devAPP);

    // start dev server on new port
    await controllerServer.startServer(devServer, devPort);

    // start endpoint listener
    await controllerEndpoints.startListener(devAPP);


    // start main project
    controllerSocketIO.rootConnect(devIO);


    // start browser and get page & client
    pptr = await controllerBot.startBrowser();
    if(!pptr) throw new Error('Something went wrong we cant find pptr');


    // get dev sockets
    const sockets = await controllerSocketIO.createDevSockets(io_client);
    const devSocket = sockets.devSocket;
    const devSocketPartner = sockets.devSocketPartner;

    // load expose functions
    await exposeFunctions(devSocket, devSocketPartner, devIO);


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



const exposeFunctions = async(devSocket, devSocketPartner, devIO)=>{ log( '\n\n---- exposeFunctions() ----' );

  // get config.json file
  await controllerExpose.config(pptr.page);


  /* ---- exposeFunctionsWeb() ---- */
  // Verify that partner recieve message
  await controllerExpose.checkPartnerMessage(pptr);
  // Simulate no user token paramater inside of URL found
  await controllerExpose.checkURLParameter(pptr);


  /* ---- exposeFunctionsReq ---- */
  await controllerExpose.details(pptr.page);


  /* ---- exposeFunctionsSocket ---- */
  // Check listener "chat message" for recieve object
  await controllerExpose.listenerChatMessage(pptr, devIO);
  // Check listener "room connect" for getting the Room ID
  await controllerExpose.listenerRoomConnect(pptr, devIO);
  // Simulate incoming message from Chat Partner
  await controllerExpose.incomeMsg(pptr, devIO);
  // Check for AMPM at CSS Selector .time with Partner Token
  await controllerExpose.checkTimeCSS(pptr, devSocket, devSocketPartner);

}; // const exposeFunctions = async()=>{
