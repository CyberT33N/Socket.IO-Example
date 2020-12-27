import {Window} from '/js/web/Window.mjs';
import {Lib} from '/js/web/Lib.mjs';

export default {
  // ---- Window ----
  getUserToken: ()=>{
    return new Window().getUserToken();
  }, // getUserToken: ()=>{

  // ---- Lib ----
  scrollBottom: css=>{
    return new Lib().scrollBottom(css);
  }, // scrollBottom: css=>{
}; // export default {
