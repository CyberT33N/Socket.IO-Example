import * as expose from '../../services/utils/exposefunctions.mjs';

export default {

  config: async page=>{return await new expose.GetData().config(page);},

  // ---- exposeFunctionsWeb() ----
  checkURLParameter: async pptr=>{
    return await new expose.CheckDOM().urlParameter(pptr);
  },
  checkPartnerMessage: async pptr=>{
    return await new expose.CheckDOM().partnerMessage(pptr);
  },

  // ---- exposeFunctionsReq() ----
  details: async page=>{
    return await new expose.GetData().details(page);
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
