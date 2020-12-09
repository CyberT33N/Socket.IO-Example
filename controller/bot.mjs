import * as bot from "../services/bot.mjs";

export default {
  startBrowser: async ()=>{ return await new bot.startBrowser().launch(); },

  openLink: async (page, link)=>{ return await new bot.Window().openLink(page, link); },
  openLinkNewTab: async (client, link, delay)=>{ return await new bot.Window().openLinkNewTab(client, link, delay); },

  newTab: async client=>{ return await new bot.Window().newTab(client); },

  click: async (css, page, delay)=>{ return await new bot.Simulate().click(css, page, delay); },
  typeText: async (page, css, msg, delay)=>{ return await new bot.Simulate().typeText(page, css, msg, delay); }
}
