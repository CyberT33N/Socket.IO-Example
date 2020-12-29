import * as req from '/js/req.mjs';


/** stuff that is related to the user */
export class User {
  /**
   * get chat partner details
   * @param {object} roomDetails - Details of the room
   * @param {string} userToken - Auth url token
   * @return {string}
  */
  getChatPartner(roomDetails, userToken) {
    if (!roomDetails || !userToken) return false;

    for (const d of roomDetails.user) {
      if (userToken !== d.usertoken) return d;
    } // for( const d of roomDetails.user ){
  }; // getChatPartner(roomDetails, userToken) {


  /**
   * get chat partner details
   * @param {object} userDetails - Details of the user
   * @return {boolean}
  */
  async getFriends(userDetails) {
    if (!userDetails?.friends) return false;

    for ( const d of userDetails.friends ) {
      const userDetails = await req.getUserDetails(d.token);
      const roomDetails = await req.getRoomDetails(d.room);

      if (!userDetails?.data?._id || !roomDetails?.data?._id) return false;

      const msg = roomDetails.data.msg;
      const lastDate = msg?.slice(-1)[0]?.date;
      const regex = /(\d+)\/(\d+)\/(\d+),/gmi;

      $('.people').append(`
        <li class="person"
            data-room="${d.room}"
            data-user="${d.token}"
            data-active="false">

          <img src="img/female.webp" alt="" />
          <span class="name">${userDetails.data?.name}</span>
          <span class="time">${lastDate?.replace(regex, '') || ''}</span>
          <span class="preview"></span>

        </li>
      `); // $('.people').append( ```
    } // for ( const d of userDetails.friends ) {

    return true;
  }; // async getFriends(userDetails) {


  /**
   * update times of chat partner from side bar
   * @param {object} roomDetails - Details of the room
   * @param {string} userToken - Auth url token
   * @param {string} AMPM - time am/pm only
   * @param {string} dateFull - full date with am/pm
   * @return {boolean}
  */
  updateTimes(roomDetails, userToken, AMPM, dateFull) {
    if (!roomDetails?._id || !userToken || !AMPM || !dateFull) return false;

    // update time header
    $('.conversation-start span').text(dateFull);

    // get chatpartner
    const ChatPartner = this.getChatPartner(roomDetails, userToken);
    if (!ChatPartner) return false;

    // update time left sidebar
    for (const d of document.querySelectorAll('.people li')) {
      if ($(d).attr('data-user') == ChatPartner.usertoken) {
        $(d).find('.time').text(AMPM);
      } // if ($(d).attr('data-user') == ChatPartner.usertoken) {
    } // for (const d of document.querySelectorAll('.people li')) {

    return true;
  }; // updateTimes(roomDetails, userToken, AMPM, dateFull) {
}; // export class User{
