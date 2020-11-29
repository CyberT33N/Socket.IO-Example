import * as web from '/js/web.mjs';
import * as main from '/js/main.mjs';

export var ROOM;

export const personClick = ()=>{ console.log( 'personClick()' );
  $(document).on('click', '.person', function(){ console.log( '.person was clicked..' );

    socketIO.emit('room connect', $(this).attr('data-room'));

    $('.top .name').text(this.querySelector('.name').textContent);

    // mark current active person li as active and all other as inactive
    $('.person').attr('data-active', 'false');
    $(this).attr('data-active', 'true');

  }); // $(document).on('click', '.person', function(){
}; // export const personClick = ()=>{









export const sendMessage = (clientToken, roomDetails, AMPM, dateFull)=>{ console.log('sendMessage()');
if( !clientToken || !roomDetails || !AMPM || !dateFull ) return false;

  const msg = $('textarea').val();
  $('textarea').val(''); // clear textarea
  console.log( 'sendMessage() - message: ' + msg );

  // do something when message is empty..
  if( !msg ) return {code: "message can not be empty"};

  // send current message to server to store it in db and to transfer it to the chat partner
  socketIO.emit('chat message', {
    "date": dateFull,
    "msg": msg,
    "room": roomDetails.id,
    "usertoken": clientToken
  });

  // send text to chat
  web.bubble(msg, 'me');

  // update times in chat APP
  web.updateTimes(roomDetails, clientToken, AMPM, dateFull);

  // scroll to bottom of chat window
  web.scrollBottom('.chat');

return true;
}; // export const sendMessage = (clientToken, roomDetails, AMPM, dateFull)=>{








// do something when message of chat partner was recieved
export const socketMSG = ()=>{ console.log( 'socketMSG()' );
  socketIO.on('msg', msg=>{ console.log( 'message incoming.. msg: ' + msg );
  if( msg?.code || !msg ) return false;

    // import messages from chat partner to chat
    web.bubble(msg, 'you');

    // update times in chat APP
    const AMPM = web.formatAMPM();
    web.updateTimes(ROOM, main.clientDetails.token, AMPM, web.formatDate() + ', ' + AMPM);

    // scroll to bottom of chat window
    web.scrollBottom('.chat');

  }); // socketIO.on('msg', (msg)=>{
}; // export const socketMSG = ()=>{















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
