/** lib functions */
export class Lib {
  /**
   * scroll to bottom of css selector
   * @param {string} css - CSS Selector
   */
  scrollBottom(css) {
    css = document.querySelector(css);
    css.scrollTop = css.scrollHeight;
  }; // scrollBottom(css){
}; // export class Lib{
