import * as expose from '../../services/utils/exposefunctions.mjs';

export default {

  config: async pptr=>{ return await expose.config(pptr); },

  // ---- exposeFunctionsWeb() ----
  checkURLParameter: async pptr=>{ return await expose.checkURLParameter(pptr); },
  checkPartnerMessage: async pptr=>{ return await expose.checkPartnerMessage(pptr); },

  // ---- exposeFunctionsReq() ----
  details: async pptr=>{ return await expose.details(pptr); },

  // ---- exposeFunctionsSocket() ----
  listenerChatMessage: async (pptr, devIO)=>{ return await new expose.Listener(pptr, devIO).listenerChatMessage(); },
  listenerRoomConnect: async (pptr, devIO)=>{ return await new expose.Listener(pptr, devIO).listenerRoomConnect(); },

  incomeMsg: async (pptr, devIO)=>{ return await expose.incomeMsg(pptr, devIO); },
  checkTimeCSS: async (pptr, socket, socketPartner)=>{ return await expose.checkTimeCSS(pptr, socket, socketPartner); }

}
