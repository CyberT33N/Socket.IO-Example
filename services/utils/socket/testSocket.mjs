/**
 * Create socket listener 'connectRoom result' and wait for message.
 * After this we start Client Side Mocha Testing and callback before()
 * @param {string} listerName - Socket Listener name.
 * @param {object} socket - Socket where we create listener on.
 * @param {string} emitName - Name of the listener we emit message.
 * @param {string} emitMsg - emit Message.
 * @return {Promise}
*/
export const testSocket = (listerName, socket, emitName, emitMsg)=>{
  if (!listerName || !socket || !emitName || !emitMsg) {
    throw new Error('Param missing at testSocket()');
  } // if (!listerName || !socket || !emitName || !emitMsg) {

  return new Promise(resolve => {
    socket.on(listerName, async roomDetails=>{
      socket.off(listerName);
      resolve();
    }); // socket.on(name, async roomDetails=>{

    socket.emit(emitName, emitMsg);
  }); // return new Promise(resolve => {
}; // export const testSocket = (listerName, socket, emitName, emitMsg)=>{
