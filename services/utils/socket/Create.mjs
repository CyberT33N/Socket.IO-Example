/* ################ Controller ################ */
import ctrlLib from '../../../controller/lib.mjs';


/** Create dev sockets */
export class Create {
  /** Create globals */
  constructor() {
    const config = ctrlLib.getConfig();
    this.clientMe = config.test.user[0];
    this.clientPartner = config.test.user[1];
    this.devHost = `${config.test.host}:${config.test.port}`;
  }; // constructor(){


  /**
   * Create socket listener 'connectRoom result' and wait for message.
   * After this we start Client Side Mocha Testing and callback before()
   * @param {string} listenerName - Socket Listener name.
   * @param {object} socket - Socket where we create listener on.
   * @param {string} emitName - Name of the listener we emit message.
   * @param {string} emitMsg - emit Message.
   * @return {Promise}
  */
  testSocket(listenerName, socket, emitName, emitMsg) {
    return new Promise(resolve => {
      if (!listenerName || !socket || !emitName || !emitMsg) {
        throw new Error('Param missing at testSocket()');
      } // if (!listenerName || !socket || !emitName || !emitMsg) {

      socket.on(listenerName, async roomDetails=>{
        socket.off(listenerName);
        resolve();
      }); // socket.on(name, async roomDetails=>{

      socket.emit(emitName, emitMsg);
    }); // return new Promise(resolve => {
  }; // testSocket(listenerName, socket, emitName, emitMsg){


  /**
   * Create dev sockets for simulating client and partner
   * @param {object} io - Socket.io
   * @return {object} return client and partner sockets
  */
  createDevSockets(io) {
    if (!io) throw new Error('Param io missing at method createDevSockets()');

    const client = io.connect(
        `${this.devHost}/?usertoken=${this.clientMe.token}`, {
          'transports': ['websocket'],
          'reconnection delay': 0,
          'reopen delay': 0,
          'force new connection': true,
        }); // const client = io.connect(

    const partner = io.connect(
        `${this.devHost}/?usertoken=${this.clientPartner.token}`, {
          'transports': ['websocket'],
          'reconnection delay': 0,
          'reopen delay': 0,
          'force new connection': true,
        }); // const partner = io.connect(

    return {client: client, partner: partner};
  }; // createDevSockets(io) {
}; // export class Create {
