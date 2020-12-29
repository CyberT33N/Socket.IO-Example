
import ctrlWeb from '/js/controller/web.mjs';
































































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
