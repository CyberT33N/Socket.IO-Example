'use strict'
const bot = require('../services/bot');

const controller = {

  startBROWSER: async ()=>{ return await bot.startBROWSER(); },
  openLink: async (page, link)=>{ return await bot.openLink(page, link); },

};

module.exports = controller;
