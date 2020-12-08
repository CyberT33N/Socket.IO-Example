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




export const checkPartnerMessage = async pptr=>{ log('--- checkPartnerMessage() ----');
  await pptr.page.exposeFunction('checkPartnerMessage', async link =>{ log('--- EXPOSE - checkPartnerMessage ----');

    // open link in new tab
    const newTab = await pptr.client.newPage();
    await controllerbot.openLink(newTab, devLinkPartner);

    // do not delete timeout - We will wait here until animation is ready
    await new Promise(resolve => setTimeout(resolve, 2000));

    // check if message was recieved at partner
    const d = await newTab.evaluate(msg=>{
      const lastElement = document.querySelector('.chat div:last-child');
      if(lastElement.textContent == msg &&
      lastElement.getAttribute('class') == 'bubble you' ) return true;
    }, 'sample_message123');

    // bring main page back to front
    await pptr.page.bringToFront();

    // return result of check
    return d;

  }); // await pptr.page.exposeFunction('checkPartnerMessage', async link =>{
}; // export const checkPartnerMessage = async pptr=>{





export const checkURLParameter = async pptr=>{ log('--- checkURLParameter() ----');
  await pptr.page.exposeFunction('checkURLParameter', async script =>{ log('--- EXPOSE - checkURLParameter - script: ' + script + '---');

    // open link in new tab
    const newTab = await pptr.client.newPage();
    await controllerbot.openLink(newTab, devHost + '/?usertoken=');

    const d = await newTab.evaluate(async script=>{
      var f = new Function('return ' + script)();
      return f();
    }, script); // const d = await newTab.evaluate(async script=>{
    log('checkURLParameter - data: ' + d);

    await pptr.page.bringToFront();
    return d;

  }); // await pptr.page.exposeFunction('checkURLParameter', ()=>{
}; // export const checkURLParameter = async pptr=>{





export const details = async pptr=>{ log('--- details() ----');
  await pptr.page.exposeFunction('details', async()=>{ log('--- EXPOSE - details ----');
      return {
        testRoomDetails: await controllerMongoDB.getRoomDetails(test_room),
        testUserDetails: await controllerMongoDB.getUserDetails(test_client1.token)
      };
  }); // await pptr.page.exposeFunction('details', async()=>{
}; // export const details = async pptr=>{
















class ListenerLib{

  async createDevSocket(page){ log('createDevSocket()');
    [this.devSocket] = await Promise.all([
      controller.rootConnect(this.devIO),
      controllerbot.openLink(page, devLink)
    ]); // [this.devSocket] = await Promise.all([
  }; // async createDevSocket(){

  async click(css, page){ log('class ListenerLib - click()');
    await page.click(css);
  }; // async newPage(){

}; // class ListenerEvents{




export class Listener extends ListenerLib{

  constructor(pptr, devIO){ log('class Listener - constructor()');
    super();
    this.pptr = pptr;
    this.devIO = devIO;
  }; // constructor(pptr, devIO){

  async listenerChatMessage(){ log('listenerChatMessage()');
    await this.pptr.page.exposeFunction('listenerChatMessage', ()=>{return new Promise(async resolve => { log('--- EXPOSE - clistenerChatMessage ----');

      const newTab = await controllerbot.newTab(this.pptr.client);
      await this.createDevSocket(newTab);

      this.devSocket.on('chat message', async msg=>{ log('sendMessage() - chat message: ' + JSON.stringify(msg, null, 4));
      // setTimeout(()=>{ devSocket.off('chat message'); }, 2000); // <-- dont delete timeout or we get error..
         await this.pptr.page.bringToFront();
         resolve(msg);
      }); // devSocket.on('chat message', (msg)=>{

      await newTab.type('textarea', 'sample_message123', { delay: 10 });
      await this.click('.write-link.send', newTab);

    })}); // await pptr.page.exposeFunction('listenerChatMessage', async link =>{
  }; // async listenerChatMessage(pptr, devIO){


  async listenerRoomConnect(){ log('listenerRoomConnect()');
    await this.pptr.page.exposeFunction('listenerRoomConnect', ()=>{return new Promise(async resolve => { log('--- EXPOSE - clistenerRoomConnect ----');

      const newTab = await controllerbot.newTab(this.pptr.client);
      await this.createDevSocket(newTab);

      this.devSocket.on('room connect', async roomID=>{ log('listenerRoomConnect() - room connect - roomID: ' + roomID);
        await this.pptr.page.bringToFront();
        resolve(roomID);
      }); // devSocket.on('room connect', async (roomID)=>{

      await this.click('.person', newTab);

    })}); // await pptr.page.exposeFunction('listenerRoomConnect', link=>{
  }; // async listenerRoomConnect(pptr, devIO){


}; // class Listener {




















export const incomeMsg = async (pptr, devIO)=>{ log('--- incomeMsg() ----');
  await pptr.page.exposeFunction('incomeMsg', async ()=>{ log('--- EXPOSE - clistenerRoomConnect ----');

    // open link in new tab
    const newTab = await pptr.client.newPage();

    const [devSocket] = await Promise.all([
      controller.rootConnect(devIO),
      controllerbot.openLink(newTab, devLinkPartner)
    ]);

    // emit sample message to trigger websocket
    devSocket.emit('msg', 'new sample message');

    // check if message was recieved at partner
    const d = await newTab.evaluate(()=>{
      const lastElement = document.querySelector('.chat div:last-child');
      if(lastElement.textContent == "new sample message" &&
      lastElement.getAttribute('class') == 'bubble you' ) return true;
    }); //   const d = await newTab.evaluate((=>{
    log('incomeMsg - data: ' + d);

    await pptr.page.bringToFront();
    return d;

  }); // await pptr.page.exposeFunction('incomeMsg', link=>{
}; // export const incomeMsg = async pptr=>{




export const checkTimeCSS = async (pptr, socket, socketPartner)=>{ log('--- checkTimeCSS() ----');
  await pptr.page.exposeFunction('checkTimeCSS', ()=>{return new Promise(resolve => { log('--- EXPOSE - ccheckTimeCSS ---');

    socket.on('msg', msg=>{ log('checkTimeCSS - success message: ' + msg);
      resolve(msg);
    }); // socket.on('msg', async (msg)=>{

    socketPartner.emit('chat message', {
      msg: "sample message22..",
      room: test_room,
      usertoken: test_client2.token,
      date: '12/34/5678, 12:34 pm'
    });

  })}); // await pptr.page.exposeFunction('checkTimeCSS', link=>{
}; // export const checkTimeCSS = async (pptr, socket, socketPartner)=>{
