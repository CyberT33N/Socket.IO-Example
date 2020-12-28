
import ctrlWeb from '/js/controller/web.mjs';












export const addConversationStart = date=>{
  $('.right .top').after(`
  <div class="chat" data-active="true">
    <div class="conversation-start">
      <span>${date}</span>
    </div>
  </div>`);
}; // export const addConversationStart = (date)=>{





















export const bubble = (msg, client)=>{ //console.log( 'bubble() - client: ' + client + '\nmsg: ' + JSON.stringify(msg, null, 4) );
if(client !== 'you' && client !== 'me' || !msg) return false;

  ctrlWeb.chatAnimations();

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
