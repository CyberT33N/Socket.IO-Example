import * as endpoints from '../services/endpoints.mjs';

export default {
  getUserDetails: async (req, res)=>{ return await new endpoints.User().getUserDetails(req, res); },
  getUserDetailsListener: async app=>{ return await new endpoints.User().detailsListener(app); },

  getRoomDetails: async (req, res)=>{ return await endpoints.getRoomDetails(req, res); },
  getRoomDetailsListener: async app=>{ return await endpoints.getRoomDetailsListener(app); }
}
