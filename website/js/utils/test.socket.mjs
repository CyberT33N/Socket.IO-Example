
import * as web from '/js/web.mjs';

import ctrlSocket from '/js/controller/socket.mjs';

let clientMe;
let clientPartner;
let testRoom;
let testRoomDetails;
let AMPM;
let dateFull;


describe('socket.mjs', ()=>{
  before(done=>{(async ()=>{
    const configJSON = await config(); // await because of this.checkNPE - bug
    clientMe = configJSON.test.user[0];
    clientPartner = configJSON.test.user[1];
    testRoom = configJSON.test.room;

    const d = await details();
    testRoomDetails = d.testRoomDetails;

    AMPM = web.formatAMPM();
    dateFull = web.formatDate() + ', ' + AMPM;

    done();
  })();}); // before(done=>{(async ()=>{


  describe('sendMessage()', ()=>{
    it('Simulate empty message', async ()=>{
      expect(await ctrlSocket.sendMessage(
          clientMe.token,
          testRoomDetails,
          AMPM,
          dateFull,
      )).toStrictEqual({code: 'message can not be empty'});
    }); // it('Simulate empty message', async ()=>{


    it('Simulate send Message', async ()=>{
      document.querySelector('textarea').value = 'sample_message123';

      expect(await ctrlSocket.sendMessage(
          clientMe.token,
          testRoomDetails,
          AMPM,
          dateFull,
      )).toBe(true);
    }); // it('Simulate send Message', async()=>{


    it('Simulate NPE', async ()=>{
      document.querySelector('textarea').value = 'sample_message123';

      expect(await ctrlSocket.sendMessage(
          null,
          testRoomDetails,
          AMPM,
          dateFull)).toBe(false);
    }); // it('Simulate NPE', async ()=>{


    it('Verify client message', async ()=>{
      const lastElement = document.querySelector('.chat div:last-child');

      let d;
      if (
        lastElement.textContent == 'sample_message123' &&
        lastElement.getAttribute('class') == 'bubble me'
      ) d = true;

      expect(d).toBe(true);
    }); // it('Verify message', async ()=>{


    it('Verify that partner recieve message', async ()=>{
      expect(await checkPartnerMessage()).toBe(true);
    }).timeout(20000); // it('Verify that partner recieve message', async ()=>{


    it('Check listener "chat message" for recieve object', async ()=>{
      expect(await listenerChatMessage()).toEqual(expect.objectContaining({
        date: expect.any(String),
        msg: expect.any(String),
        room: expect.any(String),
        usertoken: expect.any(String),
      })); // expect(
    }).timeout(20000); // it('Check listener', async()=>{
  }); // describe('sendMessage()', ()=>{


  describe('personClick()', ()=>{
    it('Simulate click on first friend', async ()=> {
      const checkElement = async selector => {
        const css = document.querySelector(selector);
        while (
          css?.textContent !== clientPartner.name
        ) await new Promise(resolve => requestAnimationFrame(resolve));
        return css;
      }; // const checkElement = async selector => {

      document.querySelector('.people li:nth-child(1)').click();

      await checkElement('.top .name');

      expect(
          document.querySelector('.top .name').textContent,
      ).toBe(clientPartner.name);
    }).timeout(20000); // it('Simulate click on first friend', async ()=> {


    // Should return data-active="true"
    it('Simulate click on first friend', async ()=>{
      document.querySelector('.people li:nth-child(1)').click();

      const checkElement = async selector => {
        const css = document.querySelector(selector);
        while (
          css?.getAttribute('data-active') !== 'true'
        ) await new Promise(resolve => requestAnimationFrame(resolve));
        return css;
      }; // const checkElement = async selector => {

      await checkElement(`li[data-user="${clientPartner.name}"]`);


      const css = `li[data-user="${clientPartner.name}"]`;
      expect(
          document.querySelector(css)?.getAttribute('data-active'),
      ).toBe('true'); // expect(
    }).timeout(20000); // it('Simulate click on first friend', async ()=>{


    it('Check listener "room connect" for getting the Room ID', async ()=>{
      expect(await listenerRoomConnect()).toBe(testRoom);
    }).timeout(20000); // it('Check listener "room connect"', async ()=>{
  }); // describe('personClick()', ()=>{


  describe('socketMSG()', ()=>{
    it('Simulate incoming message from Chat Partner', async ()=>{
      expect(await incomeMsg()).toBe(true);
    }).timeout(20000); // it('Simulate incoming message', async()=>{
  }); // describe('socketMSG()', ()=>{
}); // describe('socket.js', ()=>{
