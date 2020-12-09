import * as expose from '../../services/utils/exposefunctions.mjs';

export default {

  config: async pptr=>{ return await new expose.Config().export(pptr); },

  // ---- exposeFunctionsWeb() ----
  checkURLParameter: async pptr=>{ return await new expose.CheckDOM().urlParameter(pptr); },
  checkPartnerMessage: async pptr=>{ return await new expose.CheckDOM().partnerMessage(pptr); },

  // ---- exposeFunctionsReq() ----
  details: async pptr=>{ return await expose.details(pptr); },

  // ---- exposeFunctionsSocket() ----
  listenerChatMessage: async (pptr, devIO)=>{ return await new expose.Listener(pptr, devIO).chatMessage(); },
  listenerRoomConnect: async (pptr, devIO)=>{ return await new expose.Listener(pptr, devIO).roomConnect(); },

  checkTimeCSS: async (pptr, socket, socketPartner)=>{ return await new expose.Listener(pptr).checkTimeCSS(socket, socketPartner); },
  incomeMsg: async (pptr, devIO)=>{ return await new expose.Listener(pptr, devIO).incomeMsg(); }

}
