import * as req from '/js/req.mjs';







export const getChatPartner = (roomDetails, userToken)=>{
if(!roomDetails || !userToken ) return false;
  for( const d of roomDetails.user ){
    if( userToken !== d.usertoken ) return d;
  } // for( const d of roomDetails.user ){
}; // export const getChatPartner = (roomDetails, userToken)=>{




export const addConversationStart = date=>{
  $('.right .top').after(`
  <div class="chat" data-active="true">
    <div class="conversation-start">
      <span>${date}</span>
    </div>
  </div>`);
}; // export const addConversationStart = (date)=>{









export const getFriends = async UserDetails=>{ console.log( 'getFriends()' );
if(!UserDetails?.friends) return false;

  for( const d of UserDetails.friends ){

    const UserDetails = await req.getUserDetails(d.token);
    //console.log( 'getFriends() - UserDetails: ' + JSON.stringify(UserDetails, null, 4) );

    const roomDetails = await req.getRoomDetails(d.room);
    //console.log( 'getFriends() - roomDetails: ' + JSON.stringify(roomDetails, null, 4) );

    if( !UserDetails?.data?._id || !roomDetails?.data?._id ) return false;

      $('.people').append(`
      <li class="person" data-room="${d.room}" data-user="${d.token}" data-active="false">
        <img src="img/female.webp" alt="" />
        <span class="name">${UserDetails.data?.name}</span>
        <span class="time">${roomDetails.data?.msg?.slice(-1)[0]?.date?.replace(/(\d+)\/(\d+)\/(\d+),/gmi, '') || ''}</span>
        <span class="preview"></span>
      </li> `); //```

  } return true;
} // export const getFriends = async (UserDetails)=>{ console.log( 'getFriends()' );






export const chatAnimations = ()=>{ //console.log('chatAnimations()');
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


  friends.all.forEach(f=>{
    f.addEventListener('mousedown', ()=>{
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
}; // export const chatAnimations = ()=>{





export const bubble = (msg, client)=>{ //console.log( 'bubble() - client: ' + client + '\nmsg: ' + JSON.stringify(msg, null, 4) );
if(client !== 'you' && client !== 'me' || !msg) return false;

  chatAnimations();

  if( !$('.conversation-start').html() ) addConversationStart(`${formatDate()}, ${formatAMPM()}`);

  $('.chat').append(`<div class="bubble ${client}">${msg}</div>`);

return true;
}; // export const bubble = (msg, client)=>{
























export const formatDate = ()=>{ console.log('formatDate()');
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return mm + '/' + dd + '/' + yyyy;
}; // export const formatDate = ()=>{


export const formatAMPM = ()=>{ console.log('formatAMPM()');
  var date = new Date;
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}; // export const formatAMPM = ()=>{


export const updateTimes = (roomDetails, userToken, AMPM, dateFULL)=>{ console.log('updateTimes()');
if( !roomDetails?._id || !userToken || !AMPM || !dateFULL ) return false;

  // update time header
  $('.conversation-start span').text(dateFULL);

  // get chatpartner
  const ChatPartner = getChatPartner(roomDetails, userToken);
  if(!ChatPartner) return false;

  // update time left sidebar
  for( const d of document.querySelectorAll('.people li') ){
    if( $(d).attr('data-user') == ChatPartner.usertoken ) $(d).find('.time').text(AMPM);
  } return true;

}; // export const updateTimes = (roomDetails, userToken, AMPM, dateFULL)=>{
