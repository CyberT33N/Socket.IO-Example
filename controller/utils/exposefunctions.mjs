import * as expose from '../../services/utils/exposefunctions.mjs';

export default {

  config: async pptr=>{ return await expose.config(pptr); },

  // ---- exposeFunctionsWeb() ----
  checkURLParameter: async pptr=>{ return await expose.checkURLParameter(pptr); },
  checkPartnerMessage: async pptr=>{ return await expose.checkPartnerMessage(pptr); },

  // ---- exposeFunctionsReq() ----
  details: async pptr=>{ return await expose.details(pptr); },

  // ---- exposeFunctionsSocket() ----
  listenerChatMessage: async (pptr, devIO)=>{ return await new expose.Listener(pptr, devIO).chatMessage(); },
  listenerRoomConnect: async (pptr, devIO)=>{ return await new expose.Listener(pptr, devIO).roomConnect(); },

  incomeMsg: async (pptr, devIO)=>{ return await new expose.Listener(pptr, devIO).incomeMsg(); },
  checkTimeCSS: async (pptr, socket, socketPartner)=>{ return await new expose.Listener(pptr).checkTimeCSS(socket, socketPartner); }

}
