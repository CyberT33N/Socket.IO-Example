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


  /**
   * beautify date
   * @return {string}
   */
  formatDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  }; // formatDate() {
}; // export class Lib{
