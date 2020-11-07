'use strict'

        const log = require('fancy-log'),
   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk'),

controllermongodb = require('../controller/controller-mongodb');


const services = {

      rootConnect: async (http) => { return await rootConnect(http); }

};

module.exports = services;









async function rootConnect(http){
log( 'rootConnect();' );

  const io = require('socket.io')(http);

  io.on('connection', (socket) => {
  log('User connected..');

    // catch message from Chat Room
    messageRoom(socket);

    // start event to catch room enter request
    connectRoom(socket);

    // Check when user disconnect from website
    disconnectUser(socket);

  }); // io.on('connection', (socket) => {

}; // function rootConnect(){
















function connectRoom(socket){
log( 'connectRoom();' );

  socket.on('room connect', (roomID) => {(async () => {
  log('connectRoom() - roomID: ' + JSON.stringify(roomID, null, 4));

    if( !roomID ) return socket.emit('connectRoom result', {code : "NPE"});

    const r = await controllermongodb.getRoomDetails(roomID);
    if(r){
    log( 'getRoomDetails() success - result: ' + JSON.stringify(r, null, 4) );

      socket.join(roomID);
      socket.emit('connectRoom result', r);

    } //  if(r){
    else socket.emit('connectRoom result', {code : "Can not find Room ID in Database"});

  })().catch((e) => {  console.log('ASYNC - connectRoom Error:' +  e )  })});

} //function connectRoom(socket){





function messageRoom(socket){
//log( 'messageRoom()' );

  // {"msg": msg, "room": details.room, "usertoken": details.usertoken}
  socket.on('chat message', (msg) => {(async () => {
  log('messageRoom() - chat message - message: ' + JSON.stringify(msg, null, 4));

    if(msg?.msg){

      const r = await controllermongodb.storeMessages(msg);
      if( r?.code == "SUCCESS" ) socket.to(msg.room).emit('msg', msg.msg);

    } else socket.to(msg.room).emit('msg', {code: "Message was null"});

  })().catch((e) => {  console.log('ASYNC - chat message Error:' +  e )  })});

} // function messageRoom(socket){

















function disconnectUser(socket){ socket.on('disconnect', () => afterDisconnect() ); }

async function afterDisconnect(){
log('afterDisconnect()');

  // do something..

} // async function afterDisconnect(){
