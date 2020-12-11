/* ################ Controller ################ */
import controllerBot from '../../../controller/bot.mjs';
import controllerLib from '../../../controller/lib.mjs';

/** Lib functions for class DOM */
class Lib {
  /**
   * Execute script inside of DOM by creating new function and run it
   * @param {string} script - Script we want to execute
   * @param {object} page - PPTR page
  */
  async evalScript(script, page) {
    return await page.evaluate(async script=>{
      const f = new Function('return ' + script)();
      return f();
    }, script); // return await page.evaluate(async script=>{
  }; // async evalScript(script) {
}; // class Lib {


/** Check or execute stuff in DOM */
export class DOM extends Lib {
  /**
   * get config.yml and set global variables
   * @param {string} pptr - PPTR client & Page
  */
  constructor(pptr) {
    super();
    this.pptr = pptr;
    const config = controllerLib.getConfig();
    this.hostFull = config.test.hostFull;
    this.linkPartner = config.test.linkPartner;
  };

  /** create link in new tab and then check for empty url usertoken */
  async urlParameter() {
    await this.pptr.page.exposeFunction('checkURLParameter', async script=>{
      return this.evalScript(
          script,
          await controllerBot.openLinkNewTab(
              this.pptr.client,
              this.hostFull + '/?usertoken=',
          ), // await controllerBot.openLinkNewTab(
      ); // this.evalScript(
    }); // await pptr.page.exposeFunction('checkURLParameter', async script=>{
  }; // async urlParameter(pptr) {

  /** Check if message was recieved at partner */
  async partnerMessage() {
    await this.pptr.page.exposeFunction('checkPartnerMessage', async link=>{
      const newTab = await controllerBot.openLinkNewTab(
          this.pptr.client,
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
}; // class DOM extends Lib{
