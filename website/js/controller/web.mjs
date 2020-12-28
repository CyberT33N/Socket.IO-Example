import {Window} from '/js/web/Window.mjs';
import {Lib} from '/js/web/Lib.mjs';
import {User} from '/js/web/User.mjs';


export default {
  // ---- User ----
  getChatPartner: (roomDetails, userToken)=>{
    return new User().getChatPartner(roomDetails, userToken);
  }, // getChatPartner: ()=>{
  getFriends: async userDetails=>{
    return await new User().getFriends(userDetails);
  }, // getFriends: ()=>{


  // ---- Window ----
  getUserToken: ()=>{
    return new Window().getUserToken();
  }, // getUserToken: ()=>{


  // ---- Lib ----
  scrollBottom: css=>{
    return new Lib().scrollBottom(css);
  }, // scrollBottom: css=>{
  errorPage: e=>{
    return new Lib().errorPage(e);
  }, // errorPage: e=>{
  formatDate: ()=>{
    return new Lib().formatDate();
  }, // formatDate: ()=>{
  formatAMPM: ()=>{
    return new Lib().formatAMPM();
  }, // formatAMPM: ()=>{
  chatAnimations: ()=>{
    return new Lib().chatAnimations();
  }, // chatAnimations: ()=>{
}; // export default {
