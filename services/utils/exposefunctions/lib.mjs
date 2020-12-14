/* ################ Controller ################ */
import ctrlExpose from '../../../controller/utils/exposefunctions.mjs';


export const init = async (pptr, devSocket, devSocketPartner, devIO)=>{
  // get config.json file
  await ctrlExpose.config(pptr.page);


  /* ---- exposeFunctionsWeb() ---- */
  // Verify that partner recieve message
  await ctrlExpose.checkPartnerMessage(pptr);
  // Simulate no user token paramater inside of URL found
  await ctrlExpose.checkURLParameter(pptr);


  /* ---- exposeFunctionsReq ---- */
  await ctrlExpose.details(pptr.page);


  /* ---- exposeFunctionsSocket ---- */
  // Check listener "chat message" for recieve object
  await ctrlExpose.listenerChatMessage(pptr, devIO);
  // Check listener "room connect" for getting the Room ID
  await ctrlExpose.listenerRoomConnect(pptr, devIO);
  // Simulate incoming message from Chat Partner
  await ctrlExpose.incomeMsg(pptr, devIO);
  // Check for AMPM at CSS Selector .time with Partner Token
  await ctrlExpose.checkTimeCSS(pptr, devSocket, devSocketPartner);
}; // export const init = async (devSocket, devSocketPartner, devIO)=>{
