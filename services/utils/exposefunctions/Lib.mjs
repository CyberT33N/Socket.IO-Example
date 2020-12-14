/* ################ Controller ################ */
import ctrlExpose from '../../../controller/utils/exposefunctions.mjs';

/** Expose Functions */
class Funtions {
  /** expose config.yml */
  async config() {
    await ctrlExpose.config(this.pptr.page);
  }; // async config() {


  /** website/js/web.mjs */
  async web() {
    // Verify that partner recieve message
    await ctrlExpose.checkPartnerMessage(this.pptr);
    // Simulate no user token paramater inside of URL found
    await ctrlExpose.checkURLParameter(this.pptr);
  }; // async web() {


  /** website/js/req.mjs */
  async req() {
    await ctrlExpose.details(this.pptr.page);
  }; // async req(){


  /** website/js/socket.mjs */
  async socket() {
    // Check listener "chat message" for recieve object
    await ctrlExpose.listenerChatMessage(this.pptr, this.io);
    // Check listener "room connect" for getting the Room ID
    await ctrlExpose.listenerRoomConnect(this.pptr, this.io);
    // Simulate incoming message from Chat Partner
    await ctrlExpose.incomeMsg(this.pptr, this.io);
    // Check for AMPM at CSS Selector .time with Partner Token
    await ctrlExpose.checkTimeCSS(
        this.pptr,
        this.socketClient,
        this.socketPartner,
    ); // await ctrlExpose.checkTimeCSS(
  }; // async socket(){
}; // class Lib {


/** Expose functions */
export class Init extends Funtions {
  /**
   * Create globals
   * @param {object} pptr - Puppeteer client & page
   * @param {object} socket - Client socket
   * @param {object} socketPartner - Partner socket
   * @param {object} io - Socket.io connection
  */
  constructor(pptr, socket, socketPartner, io) {
    super();

    this.pptr = pptr;
    this.socketClient = socket;
    this.socketPartner = socketPartner;
    this.io = io;
  }; // constructor(pptr, socket, socketPartner, io) {


  /** Create all expose functions */
  async create() {
    await Promise.all([
      this.config(),
      this.web(),
      this.req(),
      this.socket(),
    ]); // await Promise.all([
  }; // async create() {
}; // class Init {
