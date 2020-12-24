/* ################ Controller ################ */
import ctrlSocket from '../../controller/socket.mjs';


/** Init MongoDB connection */
export class Init {
  /**
   * @param {object} socket - User socket
   * Do something when user disconnect
   */
  disconnectUser(socket) {
    if (!socket) throw new Error('Param socket not found at disconnectUser()');
    socket.on('disconnect', ()=> {/* ... */});
  }; // disconnectUser(socket) {


  /**
    * Create Sockets when user connects
    * @param {object} io - Socket.io
    * @return {Promise<boolean>} - Will resolve the socket of the user
  */
  rootConnect(io) {return new Promise(resolve => {
    if (!io) throw new Error('Param io not found at method rootConnect()');

    io.on('connection', socket=>{
      // catch message from Chat Room
      ctrlSocket.messageRoom(socket);

      // start event to catch room enter request
      ctrlSocket.connectRoom(socket);

      // Check when user disconnect from website
      this.disconnectUser(socket);

      resolve(socket);
    }); // io.on('connection', socket=>{
  });}; // rootConnect(io)
}; // export class Init {
