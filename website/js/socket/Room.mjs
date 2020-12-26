import * as web from '/js/web.mjs';
import * as main from '/js/main.mjs';


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

    this.clientDetails = web.getURLParams();

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
        return web.errorPage(
            `Can not connect to Room - Code: ${roomDetails.code}`,
        ); // return web.errorPage(
      } // if (roomDetails?.code) {

      // set global
      this.roomDetails = roomDetails;

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
          if (this.clientDetails.token == d.usertoken) web.bubble(d.msg, 'me');
          else web.bubble(d.msg, 'you');
        } // for( const d of roomDetails.msg ){

        // scroll to bottom of chat window
        web.scrollBottom('.chat');
      } // if(roomDetails?.msg){
    }); // socketIO.on('connectRoom result', (roomDetails)=>{
  }; // connectRoom() {
}; // export class Room {
