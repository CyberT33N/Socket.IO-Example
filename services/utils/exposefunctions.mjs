/*################ config.json ################*/
import fs from 'fs';
import yaml from 'js-yaml';
const json_config = yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8')),
     test_client1 = json_config.test.user[0],
     test_client2 = json_config.test.user[1],
        test_room = json_config.test.room,

          devHost = json_config.test.host + ':' + json_config.test.port,

          devLink = devHost + '/?usertoken=' + test_client1.token,
   devLinkPartner = devHost + '/?usertoken=' + test_client2.token;

/*################ Controller ################*/
import controller from '../../controller/socketio.mjs';
import controllerbot from '../../controller/bot.mjs';
import controllerMongoDB from '../../controller/mongodb.mjs';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';









export const config = async pptr=>{ log('--- config() ----');
  await pptr.page.exposeFunction('config', ()=>{ log('--- EXPOSE - config() ----');
      return yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8'));
  }); // await pptr.page.exposeFunction('config', ()=>{
}; // export const config = async pptr=>{




export const details = async pptr=>{ log('--- details() ----');
  await pptr.page.exposeFunction('details', async()=>{ log('--- EXPOSE - details ----');
      return {
        testRoomDetails: await controllerMongoDB.getRoomDetails(test_room),
        testUserDetails: await controllerMongoDB.getUserDetails(test_client1.token)
      };
  }); // await pptr.page.exposeFunction('details', async()=>{
}; // export const details = async pptr=>{









class CheckDOMLib{

  async openLink(client, link){ log('class CheckDOMLib - openLink()');
    const newTab = await controllerbot.newTab(client);
    await controllerbot.openLink(newTab, link);
    return newTab;
  }; // async openLink(){

  async evaluate(){

  }; // async evaluate(){

}; // class CheckDOMLib{


export class CheckDOM extends CheckDOMLib{

  constructor(){ log('class CheckDOM - constructor()');
    super();
  }; // constructor(pptr, devIO)


  async urlParameter(pptr){ log('checkURLParameter()');
    await pptr.page.exposeFunction('checkURLParameter', async script =>{ log('--- EXPOSE - checkURLParameter - script: ' + script + '---');

      const newTab = await this.openLink(pptr.client, devHost + '/?usertoken=');

      // execute script inside of DOM by creating new function and run it
      return await newTab.evaluate(async script=>{
        var f = new Function('return ' + script)();
        return f();
      }, script); // const d = await newTab.evaluate(async script=>{

    }); // await pptr.page.exposeFunction('checkURLParameter', ()=>{
  }; // async checkURLParameter(pptr){



  async partnerMessage(pptr){ log('checkPartnerMessage()');
    await pptr.page.exposeFunction('checkPartnerMessage', async link =>{ log('--- EXPOSE - checkPartnerMessage ----');

      const newTab = await controllerbot.newTab(pptr.client);
      await controllerbot.openLink(newTab, devLinkPartner);

      // do not delete timeout - We will wait here until animation is ready
      await new Promise(resolve => setTimeout(resolve, 2000));

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

      const newTab = await controllerbot.newTab(this.pptr.client);
      const [msg] = await Promise.all([
        this.createSocketListener('chat message', await this.createDevSocket(newTab, this.devIO)),
        await controllerbot.typeText(newTab, 'textarea', 'sample_message123', 10),
        await controllerbot.click('.write-link.send', newTab, 1000)
      ]); return msg;

    }); // await this.pptr.page.exposeFunction('listenerChatMessage', async ()=>{
  }; // async listenerChatMessage(){


  async roomConnect(){ log('listenerRoomConnect()');
    await this.pptr.page.exposeFunction('listenerRoomConnect', async ()=>{ log('EXPOSE - listenerRoomConnect()');

      const newTab = await controllerbot.newTab(this.pptr.client);
      const [roomID] = await Promise.all([
        this.createSocketListener('room connect', await this.createDevSocket(newTab, this.devIO)),
        controllerbot.click('.person', newTab, 1000)
      ]); return roomID;

    }); // await pptr.page.exposeFunction('listenerRoomConnect', link=>{
  }; // async listenerRoomConnect(){


  async checkTimeCSS(socket, socketPartner){ log('checkTimeCSS()');
    await this.pptr.page.exposeFunction('checkTimeCSS', async ()=>{ log('EXPOSE - checkTimeCSS');

      const msg = {
        msg: "sample message22..",
        room: test_room,
        usertoken: test_client2.token,
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

      const newTab = await controllerbot.newTab(this.pptr.client);

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
  }; // constructor(pptr, devIO){

  async createDevSocket(page, devIO){ log('createDevSocket()');
    const [devSocket] = await Promise.all([
      controller.rootConnect(devIO),
      controllerbot.openLink(page, devLink)
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
