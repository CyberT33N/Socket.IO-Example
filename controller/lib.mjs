import * as lib from '../services/lib.mjs';

export default {
  getConfig: ()=>{return new lib.GetConfig();},

  ads: ()=>{lib.ads();},

  timeoutAsync: amount=>{lib.timeoutAsync();},
};
