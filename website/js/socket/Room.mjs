import * as web from '/js/web.mjs';

import ctrlWeb from '/js/controller/web.mjs';


/** Lib methods */
class Lib {
  /**
   * return details about the room
   * @return {object}
  */
  getRoomDetails() {
    return this.roomDetails;
  }; // etRoomDetails() {
}; // class Lib {


/** Sockets that are related to Rooms */
export class Room extends Lib {
  /** load subclass and create singleton */
  constructor() {
    super();
    if (Room.instance == null) Room.instance = this;

    this.clientDetails = ctrlWeb.getUserToken();

    return Room.instance;
  }; // constructor(){


  /**
   * connect to room and do related stuff
   * roomDetails --> {"roomdetails": r[0], "userdetails": UserDetails[0]}
  */
  connectRoom() {
    socketIO.on('connectRoom result', roomDetails=>{
      if (!roomDetails) return false;
      if (roomDetails?.code) {
        return ctrlWeb.errorPage(
            `Can not connect to Room - Code: ${roomDetails.code}`,
        ); // return web.errorPage(
      } // if (roomDetails?.code) {

      // set global
      this.roomDetails = roomDetails;

      // load chat animations
      ctrlWeb.chatAnimations();

      // clear chat from DOM cause we are switching between friends
      $('.chat').remove();


      if (roomDetails?.msg) {
        if (!$('.conversation-start').html()) {
          const date = `${roomDetails.msg?.slice(-1)[0]?.date}`; // ```
          ctrlWeb.addConversationStart(date);
        } // if(!$('.conversation-start').html()) {

        // load chat animations
        ctrlWeb.chatAnimations();

        for (const d of roomDetails.msg) {
          if (this.clientDetails.token == d.usertoken) {
            ctrlWeb.bubble(d.msg, 'me');
          } else ctrlWeb.bubble(d.msg, 'you');
        } // for( const d of roomDetails.msg ){

        // scroll to bottom of chat window
        ctrlWeb.scrollBottom('.chat');
      } // if(roomDetails?.msg){
    }); // socketIO.on('connectRoom result', (roomDetails)=>{
  }; // connectRoom() {
}; // export class Room {
