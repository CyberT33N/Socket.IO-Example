import * as web from '/js/web.mjs';
import * as main from '/js/main.mjs';

export let ROOM;

/** Sockets that are related to Rooms */
export class Room {
  /**
   * connect to room and do related stuff
   * roomDetails --> {"roomdetails": r[0], "userdetails": UserDetails[0]}
  */
  connectRoom() {
    socketIO.on('connectRoom result', roomDetails=>{
      if (!roomDetails) return false;
      if (roomDetails?.code) {
        return web.errorPage(
            `Can not connect to Room - Code: ${roomDetails.code}`,
        ); // return web.errorPage(
      } // if (roomDetails?.code) {


      ROOM = roomDetails;

      // load chat animations
      web.chatAnimations();

      // clear chat from DOM cause we are switching between friends
      $('.chat').remove();


      if (roomDetails?.msg) {
        if (!$('.conversation-start').html()) {
          const date = `${roomDetails.msg?.slice(-1)[0]?.date}`; // ```
          web.addConversationStart(date);
        } // if(!$('.conversation-start').html()) {

        // load chat animations
        web.chatAnimations();

        for (const d of roomDetails.msg) {
          if (main.clientDetails.token == d.usertoken) web.bubble(d.msg, 'me');
          else web.bubble(d.msg, 'you');
        } // for( const d of roomDetails.msg ){

        // scroll to bottom of chat window
        web.scrollBottom('.chat');
      } // if(roomDetails?.msg){
    }); // socketIO.on('connectRoom result', (roomDetails)=>{
  }; // connectRoom() {
}; // export class Room {
