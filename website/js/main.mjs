import * as web from '/js/web.mjs';
import * as req from '/js/req.mjs';

import ctrlSocket from '/js/controller/socket.mjs';
import ctrlWeb from '/js/controller/web.mjs';


$(()=>{(async ()=>{
  const clientDetails = ctrlWeb.getUserToken();

  // POST request with User Token to get User Details Object
  const UserDetails = await req.getUserDetails(clientDetails.token);
  if (!UserDetails?.data) return ctrlWeb.errorPage('Can not get User Data');


  // set welcome back text to headline
  $('.headline').html(`Welcome back <strong>${UserDetails.data.name}</strong>`);


  // load friends sidebar
  if (!await web.getFriends(UserDetails.data)) {
    return ctrlWeb.errorPage('Can not get Friend List');
  } // if (!await web.getFriends(UserDetails.data)) {


  // start event to catch left sidebar contact choosing
  ctrlSocket.personClick();


  // start event for sending message
  $('.write-link.send').on('click', e=>{
    const AMPM = web.formatAMPM();
    const dateFull = ctrlWeb.formatDate() + ', ' + AMPM;
    ctrlSocket.sendMessage(
        clientDetails.token,
        ctrlSocket.getRoomDetails(),
        AMPM,
        dateFull,
    ); // ctrlSocket.sendMessage(
  }); // $(".write-link.send").on("click", (e)=>{


  // start event to catch room enter
  ctrlSocket.connectRoom();


  // start event to catch incoming messages from chat partner
  ctrlSocket.socketMSG();


  // click first person on chat list to show first chat
  $('.people li:nth-child(1)').click();
})().catch((e)=>{console.log('main.mjs - Error:' + e );});});
