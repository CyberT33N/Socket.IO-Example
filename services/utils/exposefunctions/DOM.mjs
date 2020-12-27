/* ################ Controller ################ */
import ctrlBot from '../../../controller/bot.mjs';
import ctrlLib from '../../../controller/lib.mjs';


/** Check or execute stuff in DOM */
export class DOM {
  /**
   * get config.yml and set global variables
   * @param {object} pptr - PPTR client & Page
  */
  constructor(pptr) {
    if (!pptr?.client || !pptr?.page) {
      throw new Error(`PPTR page/client was missing at Class DOM constructor`);
    } // if (!pptr?.client || !pptr?.page) {

    this.client = pptr.client;
    this.page = pptr.page;

    const config = ctrlLib.getConfig();
    this.hostFull = config.test.hostFull;
    this.linkPartner = config.test.linkPartner;
  }; // constructor(pptr) {


  /** create new tab and then check for empty url usertoken */
  async urlParameter() {
    await this.page.exposeFunction('checkURLParameter', async ()=>{
      const page = await ctrlBot.openLinkNewTab(
          this.client,
          this.hostFull + '/?usertoken=',
      ); // return await ctrlBot.openLinkNewTab(

      const token = page.url().match( /usertoken=([a-z0-9]+)/gmi );
      if (!token) return false;
      return {'token': token[0].replace('usertoken=', '')};
    }); // await pptr.page.exposeFunction('checkURLParameter', async script=>{
  }; // async urlParameter() {


  /** Check if message was recieved at partner */
  async partnerMessage() {
    await this.page.exposeFunction('checkPartnerMessage', async ()=>{
      const newTab = await ctrlBot.openLinkNewTab(
          this.client,
          this.linkPartner,
          2000,
      );

      // check if message was recieved at partner
      return await newTab.evaluate(msg=>{
        const lastElement = document.querySelector('.chat div:last-child');
        if (
          lastElement.textContent == msg &&
          lastElement.getAttribute('class') == 'bubble you'
        ) return true;
      }, 'sample_message123');
    }); // await newTab.evaluate(msg=>{
  }; // async partnerMessage(pptr) {
}; // export class DOM {
