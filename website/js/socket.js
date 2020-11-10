'use strict'

function personClick() { console.log( 'personClick()' );
  $(document).on('click', '.person', function(){ console.log( '.person was clicked..' );

    socket.emit('room connect', $(this).attr('data-room'));

    $('.top .name').text(this.querySelector('.name').textContent);

    // mark current active person li as active and all other as inactive
    $('.person').attr('data-active', 'false');
    $(this).attr('data-active', 'true');

  }); // $(document).on('click', '.person', function(){
}; // function personClick() {









function sendMessage(clientToken, roomDetails, AMPM, dateFull){ console.log('sendMessage()');
if( !clientToken || !roomDetails || !AMPM || !dateFull ) return false;

  const msg = $('textarea').val();
  $('textarea').val(''); // clear textarea
  console.log( 'sendMessage() - message: ' + msg );

  // do something when message is empty..
  if( !msg ) return {code: "message can not be empty"};

  // send current message to server to store it in db and to transfer it to the chat partner
  socket.emit('chat message', {
    "date": dateFull,
    "msg": msg,
    "room": roomDetails.id,
    "usertoken": clientToken
  });

  // send text to chat
  bubble(msg, 'me');

  // update times in chat APP
  updateTimes(roomDetails, clientToken, AMPM, dateFull);

  // scroll to bottom of chat window
  scrollBottom('.chat');

return true;
}; // function sendMessage(){








// do something when message of chat partner was recieved
function socketMSG(){ console.log( 'socketMSG()' );
  socket.on('msg', (msg)=>{ console.log( 'message incoming.. msg: ' + msg );
  if( msg?.code || !msg ) return false;

    // import messages from chat partner to chat
    bubble(msg, 'you');

    // update times in chat APP
    const AMPM = formatAMPM();
    updateTimes(ROOM, clientDetails.token, AMPM, formatDate() + ', ' + AMPM);

    // scroll to bottom of chat window
    scrollBottom('.chat');

  }); // socket.on('msg', (msg)=>{
}; // function socketMSG() {















//roomDetails --> {"roomdetails": r[0], "userdetails": UserDetails[0]}
function connectRoom() { console.log( 'connectRoom()' );
  socket.on('connectRoom result', (roomDetails)=>{ //console.log( 'connectRoom result - roomDetails: ' + JSON.stringify(roomDetails, null, 4) );
  if( roomDetails?.code ) return errorPage('Can not connect to Room - Code: ' + roomDetails?.code);
  if( !roomDetails || !roomDetails.msg ) return false;

    ROOM = roomDetails;

    // load chat animations
    chatAnimations();

    // clear chat from DOM cause we are switching between friends
    $('.chat').remove();


    if(roomDetails?.msg){ console.log( 'connectRoom result - old messages was found..' );

      if( !$('.conversation-start').html() ) addConversationStart(`${roomDetails?.msg?.slice(-1)[0]?.date}`);

      // load chat animations
      chatAnimations();

      for( const d of roomDetails.msg ){ //console.log( 'd.usertoken: ' + d.usertoken + '\nd.msg: ' + d.msg );
        if( clientDetails.token == d.usertoken ) bubble(d.msg, 'me');
        else bubble(d.msg, 'you')
      } //   for( const d of roomDetails.msg ){

      // scroll to bottom of chat window
      scrollBottom('.chat');

    } // if(roomDetails?.msg){

  }); // socket.on('connectRoom result', (roomDetails)=>{
}; // function connectRoom() {
