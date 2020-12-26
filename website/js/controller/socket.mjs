import {Msg} from '/js/socket/Msg.mjs';

export default {
  sendMessage: (clientToken, roomDetails, AMPM, dateFull)=>{
    return new Msg().sendMessage(clientToken, roomDetails, AMPM, dateFull);
  },
  socketMSG: ()=>{
    return new Msg().socketMSG();
  },
};
