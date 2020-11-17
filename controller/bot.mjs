import bot from '../services/bot.mjs';

export default {
  startBROWSER: async ()=>{ return await bot.startBROWSER(); },
  openLink: async (page, link)=>{ return await bot.openLink(page, link); }
}
