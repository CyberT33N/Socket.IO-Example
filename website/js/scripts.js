'use strict'

const socket = io();
var ROOM, clientDetails;

function getURLParams(){ return {"token": window.location.search.match( /usertoken=([a-z0-9]+)/gmi )[0].replace('usertoken=', '')}; };

$(()=>{(async()=>{

  // get URL paramater (http://localhost:1337/?usertoken=xxxx)
  clientDetails = getURLParams();
  console.log( 'clientDetails: ' + JSON.stringify(clientDetails, null, 4) );

  // POST request with User Token to get User Details Object
  const UserDetails = await getUserDetails(clientDetails.token);
  if( !UserDetails?.data ) return errorPage('Can not get User Data');
  //console.log( 'document() - UserDetails: ' + JSON.stringify(UserDetails, null, 4) );

  // set welcome back text to headline
  $('.headline').html(`Welcome back <strong>${UserDetails.data.name}</strong>`);

  // load friends sidebar
  if( !await getFriends(UserDetails.data) ) return errorPage('Can not get Friend List');

  // start event to catch left sidebar contact choosing
  personClick();

  // start event for sending message
  $(".write-link.send").on("click", function(e) { sendMessage(); });

  // start event to catch room enter
  connectRoom();

  // start event to catch incoming messages from chat partner
  socketMSG();

  // click first person on chat list to show first chat
  $('.people li:nth-child(1)').click();
  $('.top .name').text( $('.people li:nth-child(1) .name').text() );

})().catch((e) => {  console.log('ASYNC - document ready Error:' +  e )  })});





function errorPage(e){

  $('.wrapper').remove();
  $('body').append(`<div class="error usertoken">Error: ${e}</div>`);

} // function errorPage(){





















async function getUserDetails(token) {
console.log( 'getUserDetails() - token: ' + token );

  return await axios.post(  window.location.origin + '/api/getUserDetails', { usertoken: token  }, {
    headers: { authorization: 'sample_auth_token..' }
  });

}; // async function getUserDetails(token) {





async function getFriends(UserDetails) {
console.log( 'getFriends()' );

  for( const d of UserDetails.friends ){

    const UserDetails = await getUserDetails(d.token);
    console.log( 'getFriends() - UserDetails: ' + JSON.stringify(UserDetails, null, 4) );

    const roomDetails = await getRoomDetails(d.room);
    console.log( 'getFriends() - roomDetails: ' + JSON.stringify(roomDetails, null, 4) );

    if( !UserDetails?.data || !roomDetails?.data ) return false;

      $('.people').append(`
      <li class="person" data-room="${d.room}" data-user="${d.token}" data-active="false">
        <img src="img/female.webp" alt="" />
        <span class="name">${UserDetails.data.name}</span>
        <span class="time">${roomDetails.data.msg?.slice(-1)[0]?.date?.replace(/(\d+)\/(\d+)\/(\d+),/gmi, '') || ''}</span>
        <span class="preview"></span>
      </li>`);

  } // for( const friends of d.friends ){
  return true;

} // async function getFriends() {







async function getRoomDetails(roomID) {
console.log( 'getRoomDetails() - roomID: ' + roomID );

  return await axios.post(  window.location.origin + '/api/getRoomDetails', { id: roomID  }, {
    headers: { authorization: 'sample_auth_token..' }
  });

}; // async function getRoomDetails(roomID) {





























































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

}; // function chatAnimations(){





function bubble(msg, client){
console.log( 'bubble() - client: ' + client + '\nmsg: ' + JSON.stringify(msg, null, 4) );

  chatAnimations();

  if( !$('.conversation-start').html() ) $('.right .top').after(`
  <div class="chat" data-active="true">
    <div class="conversation-start">
      <span>${formatDate()}, ${formatAMPM(new Date)}</span>
    </div>
  </div>`);

  $('.chat').append(`<div class="bubble ${client}">${msg}</div>`);

}; // function bubble(){








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
  } // for( const d of document.querySelectorAll('.people li') ){

}; // function updateTimes(){







function getChatPartner(roomdetails){ for( const d of roomdetails.user ){ if( clientDetails.token !== d.usertoken ) return d; } };





























































function formatDate() {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return today = mm + '/' + dd + '/' + yyyy;

}; // function formatDate() {


function formatAMPM(date) {

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;

}; // function formatAMPM(date) {
