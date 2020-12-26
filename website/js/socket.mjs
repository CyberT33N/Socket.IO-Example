import * as web from '/js/web.mjs';
import * as main from '/js/main.mjs';

export let ROOM;






















//roomDetails --> {"roomdetails": r[0], "userdetails": UserDetails[0]}
export const connectRoom = ()=>{ console.log( 'connectRoom()' );
  socketIO.on('connectRoom result', roomDetails=>{ //console.log( 'connectRoom result - roomDetails: ' + JSON.stringify(roomDetails, null, 4) );
  if( roomDetails?.code ) return web.errorPage('Can not connect to Room - Code: ' + roomDetails?.code);
  if( !roomDetails ) return false;

    ROOM = roomDetails;

    // load chat animations
    web.chatAnimations();

    // clear chat from DOM cause we are switching between friends
    $('.chat').remove();


    if(roomDetails?.msg){ console.log( 'connectRoom result - old messages was found..' );

      if( !$('.conversation-start').html() ) web.addConversationStart(`${roomDetails?.msg?.slice(-1)[0]?.date}`); // ```

      // load chat animations
      web.chatAnimations();

      for( const d of roomDetails.msg ){ //console.log( 'd.usertoken: ' + d.usertoken + '\nd.msg: ' + d.msg );
        if( main.clientDetails.token == d.usertoken ) web.bubble(d.msg, 'me');
        else web.bubble(d.msg, 'you')
      } //   for( const d of roomDetails.msg ){

      // scroll to bottom of chat window
      web.scrollBottom('.chat');

    } // if(roomDetails?.msg){

  }); // socketIO.on('connectRoom result', (roomDetails)=>{
}; // export const connectRoom = ()=>{
