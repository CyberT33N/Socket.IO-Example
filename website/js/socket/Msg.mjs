import * as web from '/js/web.mjs';
import * as main from '/js/main.mjs';

import {ROOM} from '/js/socket.mjs';

/** Sockets that are related to messages */
export class Msg {
  /**
   * get config.yml and set global variables
   * @param {string} clientToken - User Token
   * @param {object} roomDetails - Room details
   * @param {string} AMPM - am/pm time
   * @param {string} dateFull - full time
   * @return {boolean}
  */
  sendMessage(clientToken, roomDetails, AMPM, dateFull) {
    if (!clientToken || !roomDetails || !AMPM || !dateFull) return false;

    const msg = $('textarea').val();
    $('textarea').val(''); // clear textarea

    // do something when message is empty..
    if ( !msg ) return {code: 'message can not be empty'};

    /*
       send current message to server to store it in db
       and to transfer it to the chat partner
    */
    socketIO.emit('chat message', {
      'date': dateFull,
      'msg': msg,
      'room': roomDetails.id,
      'usertoken': clientToken,
    });

    // send text to chat
    web.bubble(msg, 'me');

    // update times in chat APP
    web.updateTimes(roomDetails, clientToken, AMPM, dateFull);

    // scroll to bottom of chat window
    web.scrollBottom('.chat');

    return true;
  }; // sendMessage(clientToken, roomDetails, AMPM, dateFull){


  /** do something when message of chat partner was recieved */
  socketMSG() {
    socketIO.on('msg', msg=>{console.log( 'message incoming.. msg: ' + msg );
      if (msg?.code || !msg) return false;

      // import messages from chat partner to chat
      web.bubble(msg, 'you');

      // update times in chat APP
      const AMPM = web.formatAMPM();
      web.updateTimes(
          ROOM,
          main.clientDetails.token,
          AMPM,
          `${web.formatDate()}, ${AMPM}`,
      );

      // scroll to bottom of chat window
      web.scrollBottom('.chat');
    }); // socketIO.on('msg', (msg)=>{
  }; // socketMSG(){
}; // export class Msg{
