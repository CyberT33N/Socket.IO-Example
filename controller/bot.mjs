import * as bot from "../services/bot.mjs";

export default {
  startBrowser: async ()=>{ return await new bot.startBrowser().launch(); },

  openLink: async (page, link)=>{ return await bot.openLink(page, link); },

  newTab: async client=>{ return await bot.newTab(client); },

  click: async (css, page, delay)=>{ return await bot.click(css, page, delay); },
  typeText: async (page, css, msg, delay)=>{ return await bot.typeText(page, css, msg, delay); }
}
