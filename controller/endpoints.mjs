import * as endpoints from '../services/endpoints.mjs';

export default {
  getUserDetails: async (req, res)=>{ return await new endpoints.User().getUserDetails(req, res); },
  getUserDetailsListener: app=>{ return new endpoints.User().getUserDetailsPOST(app); },

  getRoomDetails: async (req, res)=>{ return await endpoints.getRoomDetails(req, res); },
  getRoomDetailsListener: app=>{ return new endpoints.Room().getRoomDetailsPOST(app); }
}
