import {Msg} from '/js/socket/Msg.mjs';
import {User} from '/js/socket/User.mjs';

export default {
  // ---- Msg ----
  sendMessage: (clientToken, roomDetails, AMPM, dateFull)=>{
    return new Msg().sendMessage(clientToken, roomDetails, AMPM, dateFull);
  },
  socketMSG: ()=>{
    return new Msg().socketMSG();
  },

  // ---- User ----
  personClick: ()=>{
    return new User().personClick();
  },
};
