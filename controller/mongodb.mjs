import * as mongodb from '../services/mongodb.mjs';

export default {
  connectMongoDB: async ()=>{ return await new mongodb.Init().connect(); },

  storeMessages: async msg=>{ return await mongodb.storeMessages(msg); },

  getUserDetails: async token=>{ return await mongodb.getUserDetails(token); },
  getRoomDetails: async roomID=>{ return await mongodb.getRoomDetails(roomID); }
}
