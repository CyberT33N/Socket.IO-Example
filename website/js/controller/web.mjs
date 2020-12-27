import {Window} from '/js/web/Window.mjs';

export default {
  // ---- Window ----
  getUserToken: ()=>{
    return new Window().getUserToken();
  },
};
