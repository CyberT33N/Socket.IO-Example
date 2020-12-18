import {StartBrowser} from '../services/bot/StartBrowser.mjs';
import {Window} from '../services/bot/Window.mjs';
import {Simulate} from '../services/bot/Simulate.mjs';

export default {
  // ---- Service StartBrowser ----
  startBrowser: async ()=>{return await new StartBrowser().launch();},


  // ---- Service Window ----
  openLink: async (page, link)=>{
    return await new Window().openLink(page, link);
  },
  openLinkNewTab: async (client, link, delay)=>{
    return await new Window().openLinkNewTab(client, link, delay);
  },
  newTab: async client=>{return await new Window().newTab(client);},


  // ---- Service Simulate ----
  click: async (css, page, delay)=>{
    return await new Simulate(page).click(css, delay);
  },
  typeText: async (page, css, msg, delay)=>{
    return await new Simulate(page).typeText(css, msg, delay);
  },
  setViewport: async (page, windowWidth, windowHeight)=>{
    return await new Simulate(page).setViewport(windowWidth, windowHeight);
  },
}; // export default {
