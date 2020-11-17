import endpoints from '../services/endpoints.mjs';

export default {
  getUserDetails: async (req, res)=>{ return await endpoints.getUserDetails(req, res); },
  getRoomDetails: async (req, res)=>{ return await endpoints.getRoomDetails(req, res); }
}
