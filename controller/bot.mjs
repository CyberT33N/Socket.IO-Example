import {StartBrowser} from '../services/bot/StartBrowser.mjs';
import {Window} from '../services/bot/Window.mjs';
import {Simulate} from '../services/bot/Simulate.mjs';

export default {
  // ---- Class StartBrowser ----
  StartBrowser: async ()=>{return await new StartBrowser().launch();},

  // ---- Class Window ----
  openLink: async (page, link)=>{
    return await new Window().openLink(page, link);
  },
  openLinkNewTab: async (client, link, delay)=>{
    return await new Window().openLinkNewTab(client, link, delay);
  },
  newTab: async client=>{return await new Window().newTab(client);},

  // ---- Class Simulate ----
  click: async (css, page, delay)=>{
    return await new Simulate().click(css, page, delay);
  },
  typeText: async (page, css, msg, delay)=>{
    return await new Simulate().typeText(page, css, msg, delay);
  },
}; // export default {
