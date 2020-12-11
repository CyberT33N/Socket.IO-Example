import {GetData} from '../../services/utils/exposefunctions/GetData.mjs';
import {DOM} from '../../services/utils/exposefunctions/DOM.mjs';
import {Listener} from '../../services/utils/exposefunctions/Listener.mjs';

export default {

  config: async page=>{
    return await new GetData(page).config();
  },
  // ---- exposeFunctionsReq() ----
  details: async page=>{
    return await new GetData(page).details();
  },


  // ---- exposeFunctionsWeb() ----
  checkURLParameter: async pptr=>{
    return await new DOM(pptr).urlParameter();
  },
  checkPartnerMessage: async pptr=>{
    return await new DOM(pptr).partnerMessage();
  },

  // ---- exposeFunctionsSocket() ----
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
