/* ################ Controller ################ */
import ctrlMongoDB from '../../controller/mongodb.mjs';

/* ################ Logs ################ */
import log from 'fancy-log';


/** Init MongoDB connection */
export class Room {
  /**
    * Create listener to catch messages
    * @param {object} socket - User socket
    * {"msg": msg, "room": details.room, "usertoken": details.usertoken}
  */
  messageRoom(socket) {
    socket.on('chat message', msg=>{(async ()=>{
      if (msg?.msg) {
        const r = await ctrlMongoDB.storeMessages(msg);
        if ( r?.code == 'SUCCESS' ) socket.to(msg.room).emit('msg', msg.msg);
      } // if (msg?.msg) {
      else socket.to(msg.room).emit('msg', {code: 'Message was null'});
    })().catch((e)=>{log('messageRoom() Error:' + e );});});
  }; // messageRoom(socket){


  /**
    * Create Sockets when user connects
    * @param {object} socket - User socket
  */
  connectRoom(socket) {
    socket.on('room connect', async roomID=>{
      if ( !roomID ) return socket.emit('connectRoom result', {code: 'NPE'});

      const r = await ctrlMongoDB.getRoomDetails(roomID);
      if (r) {
        socket.join(roomID);
        socket.emit('connectRoom result', r);
      } else {
        socket.emit('connectRoom result',
            {code: 'Can not find Room ID in Database'},
        ); // socket.emit(
      } // else {
    }); // socket.on('room connect', async roomID=>{
  }; // connectRoom(socket){
}; // export class Room {
