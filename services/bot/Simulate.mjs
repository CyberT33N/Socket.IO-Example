/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';


/** Simulating stuff like click, type, viewport, ... */
export class Simulate {
  /**
   * set globals
   * @param {object} page - PPTR Page
  */
  constructor(page) {
    if (!page) throw new Error('PPTR page not found at class Simulate');
    this.page = page;
  }; // constructor(css, page){


  /**
   * Click on element
   * @param {string} css - CSS Selector
   * @param {number} delay - Amount of time in ms we wait before click
  */
  async click(css, delay) {
    if (!css) throw new Error('css param was not found at click()');
    await ctrlLib.timeoutAsync(delay);
    await this.page.click(css);
  }; // async click(css, delay) {


  /**
   * Type text like human
   * @param {string} css - CSS Selector
   * @param {string} msg - Message we want to type
   * @param {number} delay - Amount of time in ms we delay key strokes
  */
  async typeText(css, msg, delay) {
    if (!css || !msg) throw new Error('param missing at typeText()');
    await this.page.type(css, msg, {delay: delay});
  }; // async typeText(css, msg, delay) {


  /**
   * Type text like human
   * @param {string} windowWidth - PPTR window Width
   * @param {string} windowHeight - PPTR window Height
  */
  async setViewport(windowWidth, windowHeight) {
    if (windowWidth && windowHeight) {
      await this.page.setViewport({width: windowWidth, height: windowHeight});
    } else throw new Error('param missing at setViewport()');
  }; // async setViewport(windowWidth, windowHeight) {
}; // export class Simulate {
