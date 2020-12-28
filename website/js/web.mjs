
import ctrlWeb from '/js/controller/web.mjs';












export const addConversationStart = date=>{
  $('.right .top').after(`
  <div class="chat" data-active="true">
    <div class="conversation-start">
      <span>${date}</span>
    </div>
  </div>`);
}; // export const addConversationStart = (date)=>{















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

  if( !$('.conversation-start').html() ) addConversationStart(`${ctrlWeb.formatDate()}, ${ctrlWeb.formatAMPM()}`);

  $('.chat').append(`<div class="bubble ${client}">${msg}</div>`);

return true;
}; // export const bubble = (msg, client)=>{





























export const updateTimes = (roomDetails, userToken, AMPM, dateFULL)=>{ console.log('updateTimes()');
if( !roomDetails?._id || !userToken || !AMPM || !dateFULL ) return false;

  // update time header
  $('.conversation-start span').text(dateFULL);

  // get chatpartner
  const ChatPartner = ctrlWeb.getChatPartner(roomDetails, userToken);
  if(!ChatPartner) return false;

  // update time left sidebar
  for( const d of document.querySelectorAll('.people li') ){
    if( $(d).attr('data-user') == ChatPartner.usertoken ) $(d).find('.time').text(AMPM);
  } return true;

}; // export const updateTimes = (roomDetails, userToken, AMPM, dateFULL)=>{
