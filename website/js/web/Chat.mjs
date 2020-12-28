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
}; // export class Chat{
