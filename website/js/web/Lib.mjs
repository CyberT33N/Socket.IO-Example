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


  /**
   * Display error tu user
   * @param {string} e - Error message
  */
  errorPage(e) {
    $('.wrapper').remove();
    $('body').append(`<div class="error usertoken">Error: ${e}</div>`);
  }; // errorPage(e) {
}; // export class Lib{
