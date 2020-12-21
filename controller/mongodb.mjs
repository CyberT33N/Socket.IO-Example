import {Search} from '../services/MongoDB/Search.mjs';
import {Store} from '../services/MongoDB/Store.mjs';
import {Init} from '../services/MongoDB/Init.mjs';
import {Update} from '../services/MongoDB/Update.mjs';


export default {
  // ---- Service Init ----
  connect: async ()=>{return await new Init().connect();},
  getConnection: ()=>{return new Init().getConnection();},


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


  // ---- Service Init ----
  updateOne: async (collection, query, update)=>{
    return await new Update().updateOne(collection, query, update);
  },
};
