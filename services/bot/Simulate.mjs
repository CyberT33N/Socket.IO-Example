/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';

/** Simulating stuff like click, type, viewport, ... */
export class Simulate {
  /**
   * Click on element
   * @param {string} css - CSS Selector
   * @param {object} page - PPTR Page
   * @param {number} delay - Amount of time in ms we wait before click
  */
  async click(css, page, delay) {
    if (delay) await ctrlLib.timeoutAsync(delay);
    await page?.click(css);
  }; // async click(css, page, delay) {


  /**
   * Type text like human
   * @param {object} page - PPTR Page
   * @param {string} css - CSS Selector
   * @param {string} msg - Message we want to type
   * @param {number} delay - Amount of time in ms we delay key strokes
  */
  async typeText(page, css, msg, delay) {
    await page.type(css, msg, {delay: delay});
  }; // async typeText(page, css, msg, delay) {


  /**
   * Type text like human
   * @param {object} page - PPTR Page
   * @param {string} windowWidth - PPTR window Width
   * @param {string} windowHeight - PPTR window Height
  */
  async setViewport(page, windowWidth, windowHeight) {
    await page.setViewport({width: windowWidth, height: windowHeight});
  }; // async setViewport(page, windowWidth, windowHeight) {
}; // export class Simulate {
