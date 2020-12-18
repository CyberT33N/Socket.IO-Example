/* ################ Controller ################ */
import ctrlSocketIO from '../../../controller/socketio.mjs';
import ctrlBot from '../../../controller/bot.mjs';
import ctrlLib from '../../../controller/lib.mjs';


/** Create Socket Listener */
class ListenerEvents {
  /** Create Listener 'chat message' */
  async chatMessage() {
    await this.page.exposeFunction('listenerChatMessage', async ()=>{
      const newTab = await ctrlBot.newTab(this.client);

      const [msg] = await Promise.all([
        this.createSocketListener(
            'chat message',
            await this.createDevSocket(newTab),
        ),
        await ctrlBot.typeText(
            newTab,
            'textarea',
            'sample_message123',
            10,
        ),
        await ctrlBot.click('.write-link.send', newTab, 1000),
      ]);

      return msg;
    }); // this.page.exposeFunction('listenerChatMessage', async ()=>{
  }; // async chatMessage()

  /** Create Listener 'room connect' */
  async roomConnect() {
    await this.page.exposeFunction('listenerRoomConnect', async ()=>{
      const newTab = await ctrlBot.newTab(this.client);

      const [roomID] = await Promise.all([
        this.createSocketListener(
            'room connect',
            await this.createDevSocket(newTab),
        ),
        ctrlBot.click('.person', newTab, 1000),
      ]);

      return roomID;
    }); // this.page.exposeFunction('listenerRoomConnect', async ()=>{
  }; // async roomConnect() {

  /**
   * Create Listener 'room connect'
   * @param {object} socket - Socket Client
   * @param {object} socketPartner - Socket Partner
  */
  async checkTimeCSS(socket, socketPartner) {
    await this.page.exposeFunction('checkTimeCSS', async ()=>{
      const msg = {
        msg: 'sample message22..',
        room: this.room,
        usertoken: this.partnerToken,
        date: '12/34/5678, 12:34 pm',
      };

      const [d] = await Promise.all([
        this.createSocketListener('msg', socket),
        this.emitMsg(socketPartner, 'chat message', msg, 1000),
      ]);

      return d;
    }); // await this.page.exposeFunction('checkTimeCSS', async ()=>{
  }; // async checkTimeCSS(socket, socketPartner) {

  /** Emit Message to listener 'msg' */
  async incomeMsg() {
    await this.page.exposeFunction('incomeMsg', async ()=>{
      const newTab = await ctrlBot.newTab(this.client);

      // emit sample message to trigger websocket
      await this.emitMsg(
          await this.createDevSocket(newTab),
          'msg',
          'new sample message',
      );

      // check if message was recieved at partner
      return await newTab.evaluate(()=>{
        const lastElement = document.querySelector('.chat div:last-child');
        if (
          lastElement.textContent == 'new sample message' &&
          lastElement.getAttribute('class') == 'bubble you'
        ) return true;
      }); // return await newTab.evaluate(()=>{
    }); // await this.page.exposeFunction('incomeMsg', async ()=>{
  }; // async incomeMsg(){
}; // class ListenerEvents{


/** create Listener for Unit Testing */
export class Listener extends ListenerEvents {
  /**
   * Create Listener 'room connect'
   * @param {object} pptr - Socket Client & Page
   * @param {object} devIO - Socket.io
  */
  constructor(pptr, devIO) {
    super();

    this.client = pptr.client;
    this.page = pptr.page;
    this.devIO = devIO;

    const config = ctrlLib.getConfig();
    this.linkClient = config.test.linkClient;
    this.room = config.test.room;
    this.partnerToken = config.test.user[1].token;
  }; // constructor(pptr, devIO){


  /**
   * Create Dev Socket
   * @param {object} page - new PPTR page
  */
  async createDevSocket(page) {
    const [devSocket] = await Promise.all([
      ctrlSocketIO.rootConnect(this.devIO),
      ctrlBot.openLink(page, this.linkClient),
    ]); return devSocket;
  }; // sync createDevSocket(page) {


  /**
   * Create Listener
   * @return {Promise}
   * @param {string} name - Listener name
   * @param {object} socket - Socket where we create Listener at
  */
  createSocketListener(name, socket) {
    return new Promise(resolve=>{
      socket.on(name, data=>{resolve(data);}); // socket.on(name, data=>{
    }); // return new Promise(resolve=>{
  }; // createSocketListener(name, socket){


  /**
   * Emit message
   * @param {object} socket - Socket where we send message
   * @param {string} name - Listener name
   * @param {string} msg - Message to send
   * @param {number} delay - Delay before we do action
  */
  async emitMsg(socket, name, msg, delay) {
    await ctrlLib.timeoutAsync(delay);
    socket.emit(name, msg);
  }; // async emitMsg(socket, name, msg, delay) {
}; // class Listener {
