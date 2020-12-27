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
}; // export class User{
