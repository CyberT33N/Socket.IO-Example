/* ################ Design ################ */
import log from 'fancy-log';

/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';


/** Puppeteer windows and tabs */
export class Window {
  /**
   * Open link in new tab and return the PPTR page
   * @param {object} client - PPTR client
   * @param {string} link - Link we will open
   * @param {number} delay - Amount of time in ms we wait before open tab
  */
  async openLinkNewTab(client, link, delay) {
    if (!client || !link) throw new Error('param missing at openLinkNewTab()');

    const page = await this.newTab(client);
    await this.openLink(page, link);
    await ctrlLib.timeoutAsync(delay);
    return page;
  }; // async openLinkNewTab(client, link, delay) {


  /**
   * Open link in current tab and return result
   * @param {object} page - PPTR page
   * @param {string} link - Link we will open
  */
  async openLink(page, link) {
    if (!page || !link) throw new Error('param missing at openLink()');

    try {
      await page.goto(link, {waitUntil: 'networkidle0', timeout: 35000});
      return true;
    } // try {
    catch (e) {log( 'class Window - openLink() Error: ' + e );
      await ctrlLib.timeoutAsync(30000); // optional timeout
      await this.openLink(page, link);
    };
  }; // async openLink(page, link) {


  /**
   * Create new tab and focus it. Then return page.
   * @param {object} client - PPTR client
  */
  async newTab(client) {
    if (!client) throw new Error('client param missing at newTab()');
    const newTab = await client.newPage();
    await newTab.bringToFront();
    return newTab;
  }; // async newTab(client) {
}; // export class Window{
