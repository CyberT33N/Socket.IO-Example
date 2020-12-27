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


  /**
   * beautify date
   * @return {string}
  */
  formatAMPM() {
    const date = new Date;
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const ampm = (hours >= 12) ? 'pm':'am';
    hours = hours % 12;
    hours = (hours) ? hours:12; // the hour '0' should be '12'
    minutes = (minutes < 10) ? `0${minutes}`:minutes;

    return `${hours}:${minutes} ${ampm}`;
  }; // formatAMPM() {
}; // export class Lib{
