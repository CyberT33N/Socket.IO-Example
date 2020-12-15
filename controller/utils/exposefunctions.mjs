import {GetData} from '../../services/utils/exposefunctions/GetData.mjs';
import {DOM} from '../../services/utils/exposefunctions/DOM.mjs';
import {Listener} from '../../services/utils/exposefunctions/Listener.mjs';
import {Init} from '../../services/utils/exposefunctions/Init.mjs';

export default {
  // ---- Service lib - Create all expose functions ----
  init: async (pptr, socket, socketPartner, io)=>{
    return await new Init(pptr, socket, socketPartner, io).create();
  },


  // ---- Service GetData ----
  config: async page=>{return await new GetData(page).config();},
  details: async page=>{return await new GetData(page).details();},


  // ---- Service DOM ----
  checkURLParameter: async pptr=>{return await new DOM(pptr).urlParameter();},
  checkPartnerMessage: async pptr=>{
    return await new DOM(pptr).partnerMessage();
  },


  // ---- Service Listener ----
  listenerChatMessage: async (pptr, devIO)=>{
    return await new Listener(pptr, devIO).chatMessage();
  },
  listenerRoomConnect: async (pptr, devIO)=>{
    return await new Listener(pptr, devIO).roomConnect();
  },
  checkTimeCSS: async (pptr, socket, socketPartner)=>{
    return await new Listener(pptr).checkTimeCSS(socket, socketPartner);
  },
  incomeMsg: async (pptr, devIO)=>{
    return await new Listener(pptr, devIO).incomeMsg();
  },
};
