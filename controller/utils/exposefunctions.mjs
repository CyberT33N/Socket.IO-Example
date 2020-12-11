import * as expose from '../../services/utils/exposefunctions.mjs';
import {GetData} from '../../services/utils/exposefunctions/GetData.mjs';
import {DOM} from '../../services/utils/exposefunctions/DOM.mjs';

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
    return await new expose.Listener(pptr, devIO).chatMessage();
  },
  listenerRoomConnect: async (pptr, devIO)=>{
    return await new expose.Listener(pptr, devIO).roomConnect();
  },

  checkTimeCSS: async (pptr, socket, socketPartner)=>{
    return await new expose.Listener(pptr).checkTimeCSS(socket, socketPartner);
  },
  incomeMsg: async (pptr, devIO)=>{
    return await new expose.Listener(pptr, devIO).incomeMsg();
  },

};
