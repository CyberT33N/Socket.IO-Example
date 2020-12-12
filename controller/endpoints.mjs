import {User} from '../services/endpoints/User.mjs';
import {Room} from '../services/endpoints/Room.mjs';


export default {
  startListener: app=>{
    new User(app).getUserDetailsPOST();
    new Room(app).getRoomDetailsPOST();
  },


  // ---- Service User ----
  getUserDetails: async (req, res)=>{
    return await new User().getUserDetails(req, res);
  },


  // ---- Service Room ----
  getRoomDetails: async (req, res)=>{
    return await new Room().getRoomDetails(req, res);
  },
};
