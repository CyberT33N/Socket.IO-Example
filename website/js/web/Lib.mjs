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


  /** animations when chat messages get loaded */
  chatAnimations() {
    const elemChat = document.querySelector('.chat[data-active="true"]');
    elemChat?.classList?.add('active-chat');

    const elemPerson = document.querySelector('.person[data-active="true"]');
    elemPerson?.classList?.add('active');

    const friends = {
      list: document.querySelector('ul.people'),
      all: document.querySelectorAll('.left .person'),
      name: '',
    };

    const chat = {
      container: document.querySelector('.container .right'),
      current: null,
      person: null,
      name: document.querySelector('.container .right .top .name'),
    };

    friends.all.forEach(f=>{
      f.addEventListener('mousedown', ()=>{
        f?.classList?.contains('active') || setAciveChat(f);
      });
    });

    /**
     * set active chat
     * @param {object} f - friends element
    */
    function setAciveChat(f) {
      const cssChatPerson = `[data-user="${chat.person}"]`;
      const chatPerson = chat.container?.querySelector(cssChatPerson);

      friends.list?.querySelector('.active')?.classList.remove('active');
      f.classList?.add('active');
      chat.current = chat?.container?.querySelector('.active-chat');
      chat.person = f?.getAttribute('data-user');
      chat.current?.classList?.remove('active-chat');
      chatPerson?.classList?.add('active-chat');
      friends.name = f?.querySelector('.name')?.innerText;
      chat.name.innerHTML = friends.name;
    }; // function setAciveChat(f) {
  }; // chatAnimations() {
}; // export class Lib{
