/*################ Controller ################*/
import controller from '../../controller/socketio.mjs';
import controllerBot from '../../controller/bot.mjs';
import controllerLib from '../../controller/lib.mjs';
import controllerMongoDB from '../../controller/mongodb.mjs';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';




export class GetData{

  async details(page){ log('class GetData - details()');
    await page.exposeFunction('details', async()=>{ log('--- EXPOSE - details ----');
      const config = controllerLib.getConfig();
      return {
        testRoomDetails: await controllerMongoDB.getRoomDetails(config.test.room),
        testUserDetails: await controllerMongoDB.getUserDetails(config.test.user[0].token)
      };
    }); // await pptr.page.exposeFunction('details', async()=>{
  }; // async details(page){


  async config(page){ log('class GetData - config()');
    await page.exposeFunction('config', ()=>{ log('--- EXPOSE - config() ----');
        return controllerLib.getConfig();
    }); // await pptr.page.exposeFunction('config', ()=>{
  }; // async config(page){

}; // export class getData(){












export class CheckDOM{

  constructor(){
    const config = controllerLib.getConfig();
    this.hostFull = config.test.hostFull;
    this.linkPartner = config.test.linkPartner;
  }; // constructor(){

  async urlParameter(pptr){ log('checkURLParameter()');
    await pptr.page.exposeFunction('checkURLParameter', async script =>{ log('--- EXPOSE - checkURLParameter - script: ' + script + '---');

      const newTab = await controllerBot.openLinkNewTab(pptr.client, this.hostFull + '/?usertoken=');

      // execute script inside of DOM by creating new function and run it
      return await newTab.evaluate(async script=>{
        var f = new Function('return ' + script)();
        return f();
      }, script); // const d = await newTab.evaluate(async script=>{

    }); // await pptr.page.exposeFunction('checkURLParameter', ()=>{
  }; // async checkURLParameter(pptr){


  async partnerMessage(pptr){ log('checkPartnerMessage()');
    await pptr.page.exposeFunction('checkPartnerMessage', async link =>{ log('--- EXPOSE - checkPartnerMessage ----');

      // do not delete timeout - We will wait here until animation is ready
      const newTab = await controllerBot.openLinkNewTab(pptr.client, this.linkPartner, 2000);

      // check if message was recieved at partner
      return await newTab.evaluate(msg=>{
        const lastElement = document.querySelector('.chat div:last-child');
        if(lastElement.textContent == msg &&
        lastElement.getAttribute('class') == 'bubble you' ) return true;
      }, 'sample_message123');

    }); // await pptr.page.exposeFunction('checkPartnerMessage', async link =>{
  }; // async checkPartnerMessage(pptr){

}; // class CheckDOM extends CheckDOMLib{














class ListenerEvents{


  async chatMessage(){ log('listenerChatMessage()');
    await this.pptr.page.exposeFunction('listenerChatMessage', async ()=>{ log('EXPOSE - listenerChatMessage()');

      const newTab = await controllerBot.newTab(this.pptr.client);
      const [msg] = await Promise.all([
        this.createSocketListener('chat message', await this.createDevSocket(newTab, this.devIO)),
        await controllerBot.typeText(newTab, 'textarea', 'sample_message123', 10),
        await controllerBot.click('.write-link.send', newTab, 1000)
      ]); return msg;

    }); // await this.pptr.page.exposeFunction('listenerChatMessage', async ()=>{
  }; // async listenerChatMessage(){


  async roomConnect(){ log('listenerRoomConnect()');
    await this.pptr.page.exposeFunction('listenerRoomConnect', async ()=>{ log('EXPOSE - listenerRoomConnect()');

      const newTab = await controllerBot.newTab(this.pptr.client);
      const [roomID] = await Promise.all([
        this.createSocketListener('room connect', await this.createDevSocket(newTab, this.devIO)),
        controllerBot.click('.person', newTab, 1000)
      ]); return roomID;

    }); // await pptr.page.exposeFunction('listenerRoomConnect', link=>{
  }; // async listenerRoomConnect(){


  async checkTimeCSS(socket, socketPartner){ log('checkTimeCSS()');
    await this.pptr.page.exposeFunction('checkTimeCSS', async ()=>{ log('EXPOSE - checkTimeCSS');

      const msg = {
        msg: "sample message22..",
        room: this.room,
        usertoken: this.partnerToken,
        date: '12/34/5678, 12:34 pm'
      };

      const [d] = await Promise.all([
        this.createSocketListener('msg', socket),
        this.emitMsg(socketPartner, 'chat message', msg, 1000)
      ]); return d;

    }); // await this.pptr.page.exposeFunction('checkTimeCSS', async ()=>{
  }; // async checkTimeCSS(socket, socketPartner){


  async incomeMsg(){ log('incomeMsg()');
    await this.pptr.page.exposeFunction('incomeMsg', async ()=>{ log('EXPOSE - incomeMsg');

      const newTab = await controllerBot.newTab(this.pptr.client);

      // emit sample message to trigger websocket
      this.emitMsg(await this.createDevSocket(newTab, this.devIO), 'msg', 'new sample message');

      // check if message was recieved at partner
      return await newTab.evaluate(()=>{
        const lastElement = document.querySelector('.chat div:last-child');
        if(lastElement.textContent == "new sample message" &&
        lastElement.getAttribute('class') == 'bubble you' ) return true;
      }); // return await newTab.evaluate(()=>{

    }); // await pptr.page.exposeFunction('incomeMsg', link=>{
  }; // async incomeMsg(){

}; // class ListenerEvents{




export class Listener extends ListenerEvents{

  constructor(pptr, devIO){ log('class Listener - constructor()');
    super();

    this.pptr = pptr;
    this.devIO = devIO;

    const config = controllerLib.getConfig();
    this.linkClient = config.test.linkClient;
    this.room = config.test.room;
    this.partnerToken = config.test.user[1].token;
  }; // constructor(pptr, devIO){

  async createDevSocket(page, devIO){ log('createDevSocket()');
    const [devSocket] = await Promise.all([
      controller.rootConnect(devIO),
      controllerBot.openLink(page, this.linkClient)
    ]); return devSocket;
  }; // async createDevSocket(){

  createSocketListener(name, socket){ return new Promise(resolve => { log(`createSocketListener() - Listener Name: ${name}`);
    socket.on(name, data=>{ log(`createSocketListener() - socket.on() - data: ${JSON.stringify(data, null, 4)}`);
      resolve(data);
     }); // socket.on(name, data=>{
  })}; // createSocketListener(name, socket){

  async emitMsg(socket, name, msg, delay){ log(`emitMsg() - Listener Name: ${name} - Message: ${JSON.stringify(msg, null, 4)} - Delay: ${delay}`);
    if(delay) await new Promise(resolve => setTimeout(resolve, delay));
    socket.emit(name, msg);
  }; // emitMsg(socket){

}; // class Listener {
