import {Search} from '../services/MongoDB/Search.mjs';
import {Store} from '../services/MongoDB/Store.mjs';
import {Init} from '../services/MongoDB/Init.mjs';


export default {
  // ---- Service Init ----
  connect: async ()=>{return await new Init().connect();},


  // ---- Service Store ----
  storeMessages: async msg=>{
    return await new Store().roomMsg(msg);
  },


  // ---- Service Search ----
  getUserDetails: async token=>{
    return await new Search().getUserDetails(token);
  },
  getRoomDetails: async roomID=>{
    return await new Search().getRoomDetails(roomID);
  },
};
