'use strict'

function personClick() {
console.log( 'personClick()' );

  $(document).on('click', '.person', function() {
  console.log( '.person was clicked..' );

    socket.emit('room connect', $(this).attr('data-room'));

    $('.top .name').text(this.querySelector('.name').textContent);

    // mark current active person li as active and all other as inactive
    $('.person').attr('data-active', 'false');
    $(this).attr('data-active', 'true');

  }); //  $(document).on('click', '.person', function() {

}; // function personClick() {









function sendMessage(){
console.log('sendMessage()');

  let msg = $('textarea').val();
  console.log( 'sendMessage() - message: ' + msg );

  // do something when message is empty..
  if( !msg ) return false;

  // send current message to server to store it in db and to transfer it to the chat partner
  socket.emit('chat message', {
    "date": formatDate() + ', ' + formatAMPM(new Date),
    "msg": msg,
    "room": ROOM.id,
    "usertoken": clientDetails.token});

  // clear textarea
  $('textarea').val('');

  // send text to chat
  bubble(msg, 'me');

  // update times in chat APP
  updateTimes();

  // scroll to bottom of chat window
  document.querySelector(".chat").scrollTop = document.querySelector(".chat").scrollHeight;

}; // function sendMessage(){








// do something when message of chat partner was recieved
function socketMSG() {
console.log( 'socketMSG()' );

  socket.on('msg', function(msg){
  console.log( 'message incoming.. msg: ' + msg );

    // catch NPE
    if( msg?.code ) return false;

    // import messages from chat partner to chat
    bubble(msg, 'you');

    // update times in chat APP
    updateTimes();

    // scroll to bottom of chat window
    document.querySelector(".chat").scrollTop = document.querySelector(".chat").scrollHeight;

  }); // socket.on('msg', function(msg){

}; // function socketMSG() {








function connectRoom() {
console.log( 'connectRoom()' );

  //msg --> {"roomdetails": r[0], "userdetails": UserDetails[0]}
  socket.on('connectRoom result', function(msg){
  console.log( 'connectRoom result - msg: ' + JSON.stringify(msg, null, 4) );

    if( msg?.code ) return errorPage('Can not connect to Room');

    ROOM = msg;

    // load chat animations
    chatAnimations();

    // clear chat from DOM cause we are switching between friends
    $('.chat').remove();




      if(msg?.msg){
      console.log( 'connectRoom result - old messages was found..' );

        if( !$('.conversation-start').html() ) {

          $('.right .top').after(`
          <div class="chat" data-active="true">
            <div class="conversation-start">
              <span>${msg?.msg?.slice(-1)[0]?.date}</span>
            </div>
          </div>`);

        } // if( !$('.conversation-start').html() ) {

        // load chat animations
        chatAnimations();

        for( const d of msg.msg ){
        console.log( 'd.usertoken: ' + d.usertoken + '\nd.msg: ' + d.msg );

          if( clientDetails.token == d.usertoken ) bubble(d.msg, 'me');
          else bubble(d.msg, 'you')

        } //   for( const d of msg.msg ){

        // scroll to bottom of chat window
        document.querySelector(".chat").scrollTop = document.querySelector(".chat").scrollHeight;

      } //  if(msg){

  }); //  socket.on('connectRoom result', function(msg){

}; // function connectRoom() {