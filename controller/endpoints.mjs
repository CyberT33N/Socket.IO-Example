import * as endpoints from '../services/endpoints.mjs';

export default {
  startListener: app=>{return endpoints.startListener(app);},

  getUserDetails: async (req, res)=>{
    return await new endpoints.User().getUserDetails(req, res);
  },
  getRoomDetails: async (req, res)=>{
    return await endpoints.getRoomDetails(req, res);
  },
};
