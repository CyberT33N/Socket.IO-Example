/*################ config.json ################*/
import fs from 'fs';
import yaml from 'js-yaml';
const json_config = yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8')),
     test_client1 = json_config.test.user[0],
     test_client2 = json_config.test.user[1],
        test_room = json_config.test.room,

          devHost = json_config.test.host + ':' + json_config.test.port;


/*################ Socket.io ################*/
import socketIO from 'socket.io';

/*################ Controller ################*/
import ctrlMongoDB from '../controller/mongodb.mjs'

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';




export const rootConnect = io=>{return new Promise(resolve => { log( 'rootConnect();' );
  io.on('connection', socket=>{ log('User connected..');
    // catch message from Chat Room
    messageRoom(socket);
    // start event to catch room enter request
    connectRoom(socket);
    // Check when user disconnect from website
    disconnectUser(socket);

    resolve(socket);
  }); // io.on('connection', socket=>{
})}; // function rootConnect(){




export const connectRoom = socket=>{ log( 'connectRoom();' );
  socket.on('room connect', roomID=>{(async()=>{ log('connectRoom() - roomID: ' + JSON.stringify(roomID, null, 4));

    if( !roomID ) return socket.emit('connectRoom result', {code : "NPE"});

    const r = await ctrlMongoDB.getRoomDetails(roomID);
    if(r){ //log( 'getRoomDetails() success - result: ' + JSON.stringify(r, null, 4) );

      socket.join(roomID);
      socket.emit('connectRoom result', r);

    } else socket.emit('connectRoom result', {code : "Can not find Room ID in Database"});

  })().catch((e)=>{  console.log('ASYNC - connectRoom Error:' +  e )  })});
}; // export const connectRoom = socket=>{



export const messageRoom = socket=>{ // {"msg": msg, "room": details.room, "usertoken": details.usertoken}
  socket.on('chat message', msg=>{(async()=>{ log('messageRoom() - chat message - message: ' + JSON.stringify(msg, null, 4));

    if(msg?.msg){

      const r = await ctrlMongoDB.storeMessages(msg);
      if( r?.code == "SUCCESS" ) socket.to(msg.room).emit('msg', msg.msg);

    } else socket.to(msg.room).emit('msg', {code: "Message was null"});

  })().catch((e)=>{  console.log('ASYNC - chat message Error:' +  e )  })});
}; // export const messageRoom = socket=>{



export const disconnectUser = socket=>{
  socket.on('disconnect', ()=> {
    // do something..
  });
}; // const disconnectUser = socket=>{







export const createDevSockets = io=>{ log( '---- createDevSockets() ----' );
  // client
  const devSocket = io.connect(`${devHost}/?usertoken=${test_client1.token}`, {
    transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
  });
  // partner
  const devSocketPartner = io.connect(`${devHost}/?usertoken=${test_client2.token}`, {
    transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
  });
  return {devSocket: devSocket, devSocketPartner: devSocketPartner};
}; // const createDevSockets = io=>{
