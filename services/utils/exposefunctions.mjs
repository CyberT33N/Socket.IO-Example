/* ################ Controller ################ */
import controller from '../../controller/socketio.mjs';
import controllerBot from '../../controller/bot.mjs';
import controllerLib from '../../controller/lib.mjs';
import controllerMongoDB from '../../controller/mongodb.mjs';

/* ################ Logs ################ */
import log from 'fancy-log';


export class GetData {
  async details(page) {
    await page.exposeFunction('details', async ()=>{
      const config = controllerLib.getConfig();
      const room = config.test.room;
      const token = config.test.user[0].token;
      return {
        testRoomDetails: await controllerMongoDB.getRoomDetails(room),
        testUserDetails: await controllerMongoDB.getUserDetails(token),
      };
    }); // await pptr.page.exposeFunction('details', async()=>{
  }; // async details(page){


  async config(page) {
    await page.exposeFunction('config', ()=>{
      return controllerLib.getConfig();
    }); // await page.exposeFunction('config', ()=>{
  }; // async config(page) {
}; // export class getData(){


export class CheckDOM {
  constructor() {
    const config = controllerLib.getConfig();
    this.hostFull = config.test.hostFull;
    this.linkPartner = config.test.linkPartner;
  }; // constructor(){

  async urlParameter(pptr) {
    await pptr.page.exposeFunction('checkURLParameter', async script=>{
      const newTab = await controllerBot.openLinkNewTab(
          pptr.client,
          this.hostFull + '/?usertoken=',
      );

      // execute script inside of DOM by creating new function and run it
      return await newTab.evaluate(async script=>{
        const f = new Function('return ' + script)();
        return f();
      }, script); // await newTab.evaluate(async script=>{
    }); // await pptr.page.exposeFunction('checkURLParameter', async script=>{
  }; // async urlParameter(pptr) {


  async partnerMessage(pptr) {
    await pptr.page.exposeFunction('checkPartnerMessage', async link=>{
      const newTab = await controllerBot.openLinkNewTab(
          pptr.client,
          this.linkPartner,
          2000,
      );

      // check if message was recieved at partner
      return await newTab.evaluate(msg=>{
        const lastElement = document.querySelector('.chat div:last-child');
        if (
          lastElement.textContent == msg &&
          lastElement.getAttribute('class') == 'bubble you'
        ) return true;
      }, 'sample_message123');
    }); // await newTab.evaluate(msg=>{
  }; // async partnerMessage(pptr) {
}; // class CheckDOM extends CheckDOMLib{


class ListenerEvents {
  async chatMessage() {
    await this.pptr.page.exposeFunction('listenerChatMessage', async ()=>{
      const newTab = await controllerBot.newTab(this.pptr.client);
      const [msg] = await Promise.all(
          [
            this.createSocketListener(
                'chat message',
                await this.createDevSocket(newTab, this.devIO),
            ),
            await controllerBot.typeText(
                newTab,
                'textarea',
                'sample_message123',
                10,
            ),
            await controllerBot.click('.write-link.send', newTab, 1000),
          ],
      ); return msg;
    }); // this.pptr.page.exposeFunction('listenerChatMessage', async ()=>{
  }; // async listenerChatMessage(){


  async roomConnect() {
    await this.pptr.page.exposeFunction('listenerRoomConnect', async ()=>{
      const newTab = await controllerBot.newTab(this.pptr.client);
      const [roomID] = await Promise.all(
          [
            this.createSocketListener(
                'room connect',
                await this.createDevSocket(newTab, this.devIO),
            ),
            controllerBot.click('.person', newTab, 1000),
          ],
      ); return roomID;
    }); // this.pptr.page.exposeFunction('listenerRoomConnect', async ()=>{
  }; // async roomConnect() {


  async checkTimeCSS(socket, socketPartner) {
    await this.pptr.page.exposeFunction('checkTimeCSS', async ()=>{
      const msg = {
        msg: 'sample message22..',
        room: this.room,
        usertoken: this.partnerToken,
        date: '12/34/5678, 12:34 pm',
      };

      const [d] = await Promise.all([
        this.createSocketListener('msg', socket),
        this.emitMsg(socketPartner, 'chat message', msg, 1000),
      ]); return d;
    }); // await this.pptr.page.exposeFunction('checkTimeCSS', async ()=>{
  }; // async checkTimeCSS(socket, socketPartner) {


  async incomeMsg() {
    await this.pptr.page.exposeFunction('incomeMsg', async ()=>{
      const newTab = await controllerBot.newTab(this.pptr.client);

      // emit sample message to trigger websocket
      this.emitMsg(
          await this.createDevSocket(newTab, this.devIO),
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
    }); // await this.pptr.page.exposeFunction('incomeMsg', async ()=>{
  }; // async incomeMsg(){
}; // class ListenerEvents{


export class Listener extends ListenerEvents {
  constructor(pptr, devIO) {
    super();

    this.pptr = pptr;
    this.devIO = devIO;

    const config = controllerLib.getConfig();
    this.linkClient = config.test.linkClient;
    this.room = config.test.room;
    this.partnerToken = config.test.user[1].token;
  }; // constructor(pptr, devIO){

  async createDevSocket(page, devIO) {
    const [devSocket] = await Promise.all([
      controller.rootConnect(devIO),
      controllerBot.openLink(page, this.linkClient),
    ]); return devSocket;
  }; // async createDevSocket(page, devIO) {

  createSocketListener(name, socket) {return new Promise(resolve=>{
    socket.on(name, data=>{
      resolve(data);
    }); // socket.on(name, data=>{
  });}; // createSocketListener(name, socket){

  async emitMsg(socket, name, msg, delay) {
    log(`
      emitMsg() - Listener Name: ${name} - Delay: ${delay}
      Message: ${JSON.stringify(msg, null, 4)}
    `);

    if (delay) await new Promise(resolve=>setTimeout(resolve, delay));
    socket.emit(name, msg);
  }; // async emitMsg(socket, name, msg, delay) {
}; // class Listener {
