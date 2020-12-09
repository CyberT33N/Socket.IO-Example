import * as mongodb from '../services/mongodb.mjs';

export default {
  connectMongoDB: async ()=>{ return await new mongodb.Init().connect(); },

  storeMessages: async msg=>{ return await mongodb.storeMessages(msg); },

  getUserDetails: async token=>{ return await new mongodb.Search().getUserDetails(token); },
  getRoomDetails: async roomID=>{ return await new mongodb.Search().getRoomDetails(roomID); }
}
