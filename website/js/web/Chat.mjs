import ctrlWeb from '/js/controller/web.mjs';


/** stuff that is related to the chat */
export class Chat {
  /**
   * add chat header that with date details
   * @param {string} date - date when conversation started
  */
  addConversationStart(date) {
    $('.right .top').after(`
      <div class="chat" data-active="true">
        <div class="conversation-start">
          <span>${date}</span>
        </div>
      </div>
    `); // $('.right .top').after(`
  }; // addConversationStart(date) {


  /**
   * add chat header that with date details
   * @param {string} msg - message
   * @param {string} client - client or partner
   * @return {boolean}
  */
  bubble(msg, client) {
    if (client !== 'you' && client !== 'me' || !msg) return false;

    ctrlWeb.chatAnimations();

    if (!$('.conversation-start').html()) {
      ctrlWeb.addConversationStart(
          `${ctrlWeb.formatDate()}, ${ctrlWeb.formatAMPM()}`,
      ); // ctrlWeb.addConversationStart(
    } // if (!$('.conversation-start').html()) {

    $('.chat').append(`<div class="bubble ${client}">${msg}</div>`);

    return true;
  }; // bubble(msg, client) {
}; // export class Chat{
