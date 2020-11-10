'use strict'

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
  $(".write-link.send").on("click", (e)=>{
    const AMPM = formatAMPM();
    const dateFull = formatDate() + ', ' + AMPM;
    sendMessage(clientDetails.token, ROOM, AMPM, dateFull);
  }); //   $(".write-link.send").on("click", (e)=>{

  // start event to catch room enter
  connectRoom();

  // start event to catch incoming messages from chat partner
  socketMSG();

  // click first person on chat list to show first chat
  $('.people li:nth-child(1)').click();

})().catch((e)=>{  console.log('ASYNC - document ready Error:' +  e )  })});
