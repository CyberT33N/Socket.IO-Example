var ROOM;
const socket = io();

// get usertoken from url -- maybe change future to cookie..
const details = getParams();



$(function () {(async () => {

    // first we send user token to server and get back the user details
    socket.emit('chat connect', {"usertoken": details.usertoken});

    // start event to catch room enter
    connectChatError();

    // connect to Chat and load friends
    await connectChatSuccess();
    console.log('connectChatSuccess() done..');




    // start event to catch left sidebar contact choosing
    personClick();

    // start event for sending message
    $(".write-link.send").on("click", function(e) { sendMessage(); });




    // start event to catch room enter
    connectRoomSuccess();

    // start event to catch incoming messages from chat partner
    socketMSG();


    // click first person on chat list to show first chat
    $('.people li:nth-child(1)').click();
    $('.top .name').text( $('.people li:nth-child(1) .name').text() );


})().catch((e) => {  console.log('ASYNC - document ready Error:' +  e )  })}); // $(function () {












  function connectChatError() {
  console.log( 'connectChatError()' );

        socket.on('connectChat error', function(e){
        console.log( 'connectChatError() - chat connectError - e: ' + JSON.stringify(e, null, 4) );

              $('.wrapper').remove();
              $('body').append(`<div class="error usertoken">${e}</div>`);

        }); // socket.on('chat message', function(msg){

  } // function connectChatError() {







function connectChatSuccess() {return new Promise(resolve => {
console.log( 'connectChatSuccess()' );

    socket.on('connectChat success', function(userdetails){(async () => {
    console.log( 'connectChat success - userdetails: ' + JSON.stringify(userdetails, null, 4) );

       // set welcome back text to headline
       $('.headline').html(`Welcome back <strong>${userdetails.name}</strong>`);

       await getFriends(userdetails);
       resolve(true);

    })().catch((e) => {  console.log('ASYNC - connectChat success - Error:' +  e )  })}); // socket.on('connectChat success', functionuserdetails){


})}; // function connectChatSuccess() {






async function getFriends(userdetails) {
console.log( 'getFriends()' );

     for( const d of userdetails.friends ){

           const roomDetails = await getLastTimeChat(d.room);
           console.log( 'getLastTimeChat() done..' );

           $('.people').append(`
             <li class="person" data-room="${d.room}" data-user="${d.token}" data-active="false">
                 <img src="img/female.webp" alt="" />
                 <span class="name">${d.name}</span>
                 <span class="time">${roomDetails?.msg?.slice(-1)[0]?.date?.replace(/(\d+)\/(\d+)\/(\d+),/gmi, '') || ''}</span>
                 <span class="preview"></span>
             </li>`);

     } // for( const friends of d.friends ){

} // async function getFriends() {







function getLastTimeChat(roomID) {return new Promise(resolve => {
console.log( 'getLastTimeChat() - roomID: ' + roomID );


    // catch result from roomdetails check
    socket.on('chat getRoomDetails success', function(roomdetails){
    console.log( 'chat getRoomDetails success - roomdetails: ' + JSON.stringify(roomdetails, null, 4) );

       // clear socket for next usage.. maybe replace this socket with REST API Endpoint in future..
       socket.off('chat getRoomDetails success');
       resolve(roomdetails[0]);

    }); // socket.on('connectChat success', functionuserdetails){

    // send room ID to the server to recieve room Details
    socket.emit('chat getRoomDetails', roomID);


})}; // function getLastTimeChat(roomID) {































































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


} // function personClick() {











// do something when message of chat partner was recieved
function socketMSG() {
console.log( 'socketMSG()' );

   socket.on('msg', function(msg){
   console.log( 'message incoming.. msg: ' + msg );

         // import messages from chat partner to chat
         bubbleYOU(msg);

         // update times in chat APP
         updateTimes();

         // scroll to bottom of chat window
         document.querySelector(".chat").scrollTop = document.querySelector(".chat").scrollHeight;

   }); // socket.on('msg', function(msg){

} // function socketMSG() {








function connectRoomSuccess() {
console.log( 'connectRoomSuccess()' );


   //msg --> {"roomdetails": r[0], "userdetails": UserDetails[0]}
   socket.on('connectRoom success', function(msg){
   console.log( 'connectRoom success - msg: ' + JSON.stringify(msg, null, 4) );
   ROOM = msg;

   // load chat animations
   chatAnimations();

   // clear chat from DOM cause we are switching between friends
   $('.chat').remove();

         if(msg?.msg){
         console.log( 'connectRoom success - old messages was found..' );


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

                   if( details.usertoken == d.usertoken ) bubbleME(d.msg);
                   else bubbleYOU(d.msg)

              } //   for( const d of msg.msg ){



              // scroll to bottom of chat window
              document.querySelector(".chat").scrollTop = document.querySelector(".chat").scrollHeight;


         } //  if(msg){





   }); //  socket.on('connectRoom success', function(msg){



} // function connectRoomSuccess() {












































































function sendMessage(){
console.log('sendMessage()');

      let msg = $('textarea').val();
      console.log( 'sendMessage() - message: ' + msg );

      // send current message to server to store it in db and to transfer it to the chat partner
      socket.emit('chat message', {
        "date": formatDate() + ', ' + formatAMPM(new Date),
        "msg": msg,
        "room": ROOM.id,
        "usertoken": details.usertoken});

      // clear textarea
      $('textarea').val('');

      // send text to chat
      bubbleME(msg);

      // update times in chat APP
      updateTimes();

      // scroll to bottom of chat window
      document.querySelector(".chat").scrollTop = document.querySelector(".chat").scrollHeight;

} // function sendMessage(){





function updateTimes(){
console.log('updateTimes()');

    let AMPM = formatAMPM(new Date);
    let dateFULL = formatDate() + ', ' + AMPM;

    // update time header
    $('.conversation-start span').text(dateFULL);

    // get chatpartner
    let ChatPartner = getChatPartner(ROOM);

    // update time left sidebar
    for( const d of document.querySelectorAll('.people li') ){
      if( $(d).attr('data-user') == ChatPartner.usertoken ) $(d).find('.time').text(AMPM);
    }

} // function updateTimes(){







function getChatPartner(roomdetails){
   for( const d of roomdetails.user ){ if( details.usertoken !== d.usertoken ) return d }
} // function getChatPartner(msg){





























































function formatDate() {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return today = mm + '/' + dd + '/' + yyyy;

} // function formatDate() {


function formatAMPM(date) {

   var hours = date.getHours();
   var minutes = date.getMinutes();
   var ampm = hours >= 12 ? 'pm' : 'am';
   hours = hours % 12;
   hours = hours ? hours : 12; // the hour '0' should be '12'
   minutes = minutes < 10 ? '0'+minutes : minutes;
   var strTime = hours + ':' + minutes + ' ' + ampm;
   return strTime;

} // function formatAMPM(date) {





function getParams(){
console.log('getParams()');

  let usertoken = window.location.search.match( /usertoken=([a-z0-9]+)/gmi );
      usertoken = usertoken[0].replace('usertoken=', '');
  console.log( 'usertoken: ' + usertoken );

  return {"usertoken": usertoken};

} // function getParams(){




















































































 function bubbleME(msg){
 console.log( 'bubbleME()' );


   chatAnimations();


     if( !$('.conversation-start').html() ) $('.right .top').after(`
     <div class="chat" data-active="true">

       <div class="conversation-start">
           <span>${formatDate()}, ${formatAMPM(new Date)}</span>
       </div>

     </div>`);

     $('.chat').append(`
       <div class="bubble me">
           ${msg}
       </div>
     `);

 } // function bubbleME(){




function bubbleYOU(msg){
console.log( 'bubbleYOU()' );

   chatAnimations();


    if( !$('.conversation-start').html() ) $('.right .top').after(`
    <div class="chat" data-active="true">

      <div class="conversation-start">
          <span>${formatDate()}, ${formatAMPM(new Date)}</span>
      </div>

    </div>`);

    $('.chat').append(`
      <div class="bubble you">
          ${msg}
      </div>
    `);

} // function bubbleYOU(){










































function chatAnimations(){
console.log('chatAnimations()');


    document.querySelector('.chat[data-active="true"]')?.classList?.add('active-chat');
    document.querySelector('.person[data-active="true"]')?.classList?.add('active');

    let friends = {
      list: document.querySelector('ul.people'),
      all: document.querySelectorAll('.left .person'),
      name: '' },

    chat = {
      container: document.querySelector('.container .right'),
      current: null,
      person: null,
      name: document.querySelector('.container .right .top .name') };


    friends.all.forEach(f => {
      f.addEventListener('mousedown', () => {
        f?.classList?.contains('active') || setAciveChat(f);
      });
    });

    function setAciveChat(f) {
      friends.list?.querySelector('.active')?.classList.remove('active');
      f.classList?.add('active');
      chat.current = chat?.container?.querySelector('.active-chat');
      chat.person = f?.getAttribute('data-user');
      chat.current?.classList?.remove('active-chat');
      chat.container?.querySelector('[data-user="' + chat.person + '"]')?.classList?.add('active-chat');
      friends.name = f?.querySelector('.name')?.innerText;
      chat.name.innerHTML = friends.name;
    }

} // function chatAnimations(){
