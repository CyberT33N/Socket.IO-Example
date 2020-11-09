'use strict'

const {getUserDetails, getRoomDetails, connectMongoDB} = require('../services/mongodb'),

           expect = require('expect'),

               fs = require('fs'),
      json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),
     test_client1 = json_config.test.user[0],
     test_client2 = json_config.test.user[1],
        test_room = json_config.test.room,
             host = json_config.test.host,
             link = host + '/?usertoken=' + test_client1.token,
            link2 = host + '/?usertoken=' + test_client2.token,

               io = require('socket.io-client'),

    controllerbot = require('../controller/controller-bot'),
controllermongodb = require('../controller/controller-mongodb'),

              log = require('fancy-log'),
   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk');

var pptr, testRoomDetails, testUserDetails, AMPM, dateFull, ChatPartner, socket, socket2;

// create function to create loop if something went wrong like timeout to restart
async function openLink(page, link){
  if( !await controllerbot.openLink(page, link) ) return await openLink(page, link);
};

// return formatDate + ', ' + AMPM;
async function formatDate(AMPM){ log('formatDate()');
  return await pptr.page.evaluate(async()=>{
    return await formatDate();
  });
}; //async function formatDate(){


async function getAMPM(){ log('getAMPM()');
  return await pptr.page.evaluate(async()=>{
    return await formatAMPM();
  });
}; // async function getAMPM(){ log('getAMPM()');







describe('Client Side Services', () => {


  before( (done) => { (async()=>{

    // start browser and get page & client
    pptr = await controllerbot.startBROWSER();
    if(!pptr) throw new Error('Something went wrong we cant find pptr');

    await openLink(pptr.page, link);

    await connectMongoDB();

    // get room details of test room
    testRoomDetails = await getRoomDetails(test_room);
    if(!testRoomDetails?._id) throw new Error('before() - Cant get Room Details');

    // get user details of test user
    testUserDetails = await getUserDetails(test_client1.token);
    if(!testUserDetails?._id) throw new Error('before() - Cant get User Details');



    // client 1
    socket = io.connect(`${host}/?usertoken=${test_client1.token}`, {
      transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

    // client 2
    socket2 = io.connect(`${host}/?usertoken=${test_client2.token}`, {
      transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

    socket.on('connectRoom result', function(roomDetails) {
    //log('connectRoom result - Successfully connect - roomDetails: ' + JSON.stringify(roomDetails, null, 4));
      socket.off('connectRoom result');
      done();
    }); // socket.on('connectRoom result', function(roomDetails) {

    socket.emit('room connect', test_room);

  })().catch((e)=>{  log('ASYNC - client.test.js - MAIN - Error: ' + e)  })}); // before( (done) => {





































  describe('reg.js', () => {



    describe('getUserDetails() - POST', ()=>{

      it('Should return data object with key _id', async()=>{
        const r = await pptr.page.evaluate(async(token)=>{
          return await getUserDetails(token);
        }, test_client1.token);
        log('Simulate correct token - result: ' + JSON.stringify(r, null, 4));

        expect( r?.data ).toEqual(expect.objectContaining({ _id: expect.anything() }));
      }); // it('Should return object with data key', async() => {


      it('Simulate wrong token - Should return "User Token was not found in Database"', async()=>{
        const r = await pptr.page.evaluate(async(token)=>{
          try{ const r = await getUserDetails(token); } catch (e){ return e }
        }, 'wrong_token');
        //log('Simulate wrong token - result: ' + JSON.stringify(r, null, 4));

        expect( r?.response?.data?.msg ).toBe( 'User Token was not found in Database' );
      }); // it('Simulate wrong token - Should return object without data key', async()=>{


      it('Simulate NPE - Should return "User Token can not be null"', async()=>{
        const r = await pptr.page.evaluate(async(token)=>{
          try{ const r = await getUserDetails(token); } catch (e){ return e }
        }, null);
        //log('Simulate wrong token - result: ' + JSON.stringify(r, null, 4));

        expect( r?.response?.data?.msg ).toBe( 'User Token can not be null' );
      }); // it('Simulate wrong token - Should return object without data key', async()=>{

    }); // describe('getUserDetails()', () => {




    describe('getRoomDetails() - POST', ()=>{

      it('Should return data object with key _id', async()=>{
        const r = await pptr.page.evaluate(async(id)=>{
          return await getRoomDetails(id);
        }, test_room);
        //log('Simulate correct room ID - result: ' + JSON.stringify(r, null, 4));

        expect( r?.data ).toEqual(expect.objectContaining({ _id: expect.anything() }));
      }); // it('Should return data object with key _id', async()=>{


      it('Simulate wrong Room ID - Should return "Room ID was not found in Database"', async()=>{
        const r = await pptr.page.evaluate(async(id)=>{
          try{ const r = await getRoomDetails(id); } catch (e){ return e }
        }, 'wrong_roomID');
        //log('Simulate wrong Room ID - result: ' + JSON.stringify(r, null, 4));

        expect( r?.response?.data?.msg ).toBe( 'Room ID was not found in Database' );
      }); // it('Simulate wrong Room ID - Should return "Room ID was not found in Database"', async()=>{


      it('Simulate NPE - Should return "Room ID can not be null"', async()=>{
        const r = await pptr.page.evaluate(async(id)=>{
          try{ const r = await getRoomDetails(id); } catch (e){ return e }
        }, null);
        //log('Simulate wrong Room ID - result: ' + JSON.stringify(r, null, 4));

        expect( r?.response?.data?.msg ).toBe( 'Room ID can not be null' );
      }); // it('Simulate NPE - Should return "Room ID can not be null"', async()=>{

    }); // describe('getRoomDetails()', () => {




  }); // describe('reg.js', () => {






















  describe('web.js', () => {


    describe('getChatPartner()', () => {


      it('Should return object with key usertoken', async()=>{

        ChatPartner = await pptr.page.evaluate(async(d)=>{
          return await getChatPartner(d.roomDetails, d.usertoken);
        }, {roomDetails: testRoomDetails, usertoken: test_client1.token});

        expect(ChatPartner).toEqual(expect.objectContaining({ usertoken: expect.anything() }));

      }); // it('Should return object with key _id', async()=>{


      it('Simulate NPE - Should return false', async()=>{
          expect( await pptr.page.evaluate(async(d)=>{
            return await getChatPartner(d.roomDetails, d.usertoken);
          }, {"roomDetails": null, "usertoken": test_client1.token})).toBe(false);
      }); // it('Simulate NPE - Should return false', async()=>{


    }); // describe('getChatPartner()', () => {






    describe('getFriends()', () => {

      it('Should return object with key _id', async()=>{
          expect( await pptr.page.evaluate(async(userDetails)=>{
            return await getFriends(userDetails);
          }, testUserDetails)).toBe(true);
      }); // it('Should return object with key _id', async()=>{


      it(`Search for CSS Selector .person[data-room="${test_room}"] - Should return true`, async()=>{
          expect( await pptr.page.$(`.person[data-room="${test_room}"]`) ).toBeTruthy();
      }); // it('Should return object with key _id', async()=>{


      it('Simulate NPE - Should return false', async()=>{
          expect( await pptr.page.evaluate(async(userDetails)=>{
            return await getFriends(userDetails);
          }, null)).toBe(false);
      }); // it('Simulate NPE - Should return false', async()=>{

    }); // describe('getFriends()', () => {









    describe('bubble()', () => {


      it('Simulate message NPE - Should return false', async()=>{
        expect( await pptr.page.evaluate(async(d)=>{
          return await bubble(d.msg, d.client);
        }, {msg: null, client: "you" })).toBe(false);
      }); // it('Simulate partner message', async()=>{


      it('Simulate wrong client - Should return false', async()=>{
        expect( await pptr.page.evaluate(async(d)=>{
          return await bubble(d.msg, d.client);
        }, {msg: null, client: "wrong_client" })).toBe(false);
      }); // it('Simulate partner message', async()=>{


      it('Simulate client message', async()=>{
        expect( await pptr.page.evaluate(async(d)=>{
          return await bubble(d.msg, d.client);
        }, {msg: "sample message", client: "me" })).toBe(true);
      }); // it('Simulate client message', async()=>{


      it(`Search for CSS Selector .bubble.me with text "sample message" - Should return true`, async()=>{
          expect( await pptr.page.evaluate(async()=>{

            for(const d of document.querySelectorAll(`.bubble.me`)){
              if(d.textContent == "sample message") return true;
            }

          })).toBe(true);
      }); // it(`Search for CSS Selector .bubble.me with text "sample message" - Should return true`, async()=>{


      it('Simulate partner message', async()=>{
        expect( await pptr.page.evaluate(async(d)=>{
          return await bubble(d.msg, d.client);
        }, {msg: "sample message", client: "you" })).toBe(true);
      }); // it('Simulate partner message', async()=>{


      it(`Search for CSS Selector .bubble.you with text "sample message" - Should return true`, async()=>{
          expect( await pptr.page.evaluate(async()=>{

            for(const d of document.querySelectorAll(`.bubble.you`)){
              if(d.textContent == "sample message") return true;
            }

          })).toBe(true);
      }); //   it(`Search for CSS Selector .bubble.you with text "sample message" - Should return true`, async()=>{


      it(`Search for CSS Selector .conversation-start - Should return true`, async()=>{
          expect( await pptr.page.$('.conversation-start') ).toBeTruthy();
      }); // it(`Search for CSS Selector .conversation-start - Should return true`, async()=>{



    }); // describe('bubble()', () => {







    describe('formatAMPM()', () => {
      it('Should return xx:xx am/pm', async()=>{
        AMPM = await getAMPM();
        expect( AMPM ).toMatch(/([0-1]?[0-9]|2[0-3]):[0-5][0-9] (am|pm)/gmi);
      }); // it('Should return xx:xx am/pm', async()=>{
    }); // describe('formatAMPM()', () => {




    describe('formatDate()', () => {
      it('Should return mm/dd/yyyy', async()=>{
        const date = await formatDate(AMPM);
        dateFull = date + ', ' + AMPM;
        expect( date ).toMatch(/\d\d\/\d\d\/\d\d\d\d/gmi);
      }); // it('Should return mm/dd/yyyy', async()=>{
    }); // describe('formatDate()', () => {








    describe('updateTimes()', () => {



      it('Simulate successfully update times - Should return true', async()=>{
        expect(await pptr.page.evaluate(async(d)=>{
          return await updateTimes(d.roomDetails, d.userDetails, d.AMPM, d.dateFull);
        }, {roomDetails: testRoomDetails, userDetails: testUserDetails, AMPM: AMPM, dateFull: dateFull})).toBe(true);
      }); // it('Simulate successfully update times - Should return true', async()=>{


      it(`Check for date at CSS Selector .conversation-start span`, async()=>{
        expect(await pptr.page.evaluate(async()=>{
          return document.querySelector('.conversation-start span').textContent;
        })).toBe(dateFull);
      }); // it(`Check for date(${dateFull}) at CSS Selector .conversation-start span`, async()=>{


      it(`Check for AMPM(${AMPM}) at CSS Selector .time with Partner Token`, ()=>{

        socket.on('msg', async function(msg) {
        log('updateTimes() - success message: ' + msg);

          expect(await pptr.page.evaluate(async(token)=>{
            return document.querySelector(`.people li[data-user="${token}"]`)?.querySelector('.time')?.textContent;
          }, ChatPartner.usertoken)).toBe(AMPM);


        }); // socket.on('msg', function(msg) {

        socket2.emit('chat message', {msg: "sample message22..", room: test_room, usertoken: test_client2.token, date: dateFull });

      }); // it(`Check for AMPM(${AMPM}) at CSS Selector .time with Partner Token`, (done)=>{


      it('Simulate NPE  - Should return false', async()=>{
          expect(await pptr.page.evaluate(async(d)=>{
            return await updateTimes(d.roomDetails, d.userDetails);
          }, {roomDetails: null, userDetails: null})).toBe(false);
      }); // it('Simulate NPE  - Should return false', async()=>{




    }); // describe('updateTimes()', () => {










    describe('getURLParams()', () => {

      it('Should return token from URL paramater', async()=>{
        const r = await pptr.page.evaluate(async()=>{
          return await getURLParams();
        });
        log('getURLParams() - result: ' + JSON.stringify(r, null, 4));

        expect( r ).toEqual(expect.objectContaining({ token: expect.anything() }));
      }); // it('Should return token from URL paramater', async()=>{


      it('Simulate no user token paramater inside of URL found', async()=>{
        await openLink(pptr.page, host + '/?usertoken=');
        expect( await pptr.page.evaluate(async()=>{
          return await getURLParams();
        })).toBe(false);
      }); // it('Should return token from URL paramater', async()=>{


    }); // describe('getURLParams()', () => {







  }); // describe('web.js', () => {



















  describe('socket.js', () => {


    describe('personClick()', () => {


      it('Simulate click on first friend - Should return textContent of CSS Selector .top .name', async()=>{

        await openLink(pptr.page, link);
        await pptr.page.click('.people li:nth-child(1)');

        await pptr.page.waitFor((name) => {
          return document.querySelector('.top .name')?.textContent == name;
        }, {timeout: 10000}, test_client2.name);

        expect( await pptr.page.evaluate(() => document.querySelector('.top .name').textContent) ).toBe(test_client2.name);

      }); // it('Should return token from URL paramater', ()=>{


      it('Simulate click on first friend - Should return data-active="true"', async()=>{

        await pptr.page.click('.people li:nth-child(1)');

        await pptr.page.waitFor((name) => {
          return document.querySelector(`li[data-user="${name}"]`)?.getAttribute('data-active') == 'true';
        }, {timeout: 10000}, test_client2.name);

        expect( await pptr.page.evaluate((name) => {
          return document.querySelector(`li[data-user="${name}"]`)?.getAttribute('data-active');
        }, test_client2.name) ).toBe('true');

      }); // it('Simulate click on first friend - Should return data-active="true"', async()=>{

    }); // describe('personClick()', () => {



    describe('sendMessage()', () => {


      it('Simulate empty message - Should return {code: "message can not be empty"}', async()=>{
        expect( await pptr.page.evaluate((d) => {
          return sendMessage(d.userToken, d.roomDetails, d.AMPM, d.dateFull);
        }, {userToken: test_client1.token, roomDetails: testRoomDetails, AMPM: AMPM, dateFull: dateFull})).toStrictEqual({code: "message can not be empty"});
      }); // it('Simulate empty message - Should return {code: "message can not be empty"}', async()=>{


      it('Simulate send Message - Should return true', async()=>{

        await pptr.page.type('textarea', 'sample_message123', { delay: 10 });

        expect( await pptr.page.evaluate((d) => {
          return sendMessage(d.userToken, d.roomDetails, d.AMPM, d.dateFull);
        }, {userToken: test_client1.token, roomDetails: testRoomDetails, AMPM: AMPM, dateFull: dateFull})).toBe(true);

      }); // it('Simulate send Message - Should return true', async()=>{


      it('Simulate NPE - Should return true', async()=>{

        await pptr.page.type('textarea', 'sample_message123', { delay: 10 });

        expect( await pptr.page.evaluate((d) => {
          return sendMessage(d.userToken, d.roomDetails, d.AMPM, d.dateFull);
        }, {userToken: null, roomDetails: testRoomDetails, AMPM: AMPM, dateFull: dateFull})).toBe(false);

      }); // it('Simulate NPE - Should return true', async()=>{


      it('Verify client message - Should return true', async()=>{
        expect( await pptr.page.evaluate((msg) => {
          for( const d of document.querySelectorAll('.bubble.me') ){
            if( d.textContent == msg ) return true;
          } // for( const d of document.querySelectorAll() ){
        }, 'sample_message123')).toBe(true);
      }); // it('Verify message - Should return true', async()=>{


      it('Verify that partner recieve message - Should return true', async()=>{
        await openLink(pptr.page, link2);
        expect( await pptr.page.evaluate((msg) => {
          for( const d of document.querySelectorAll('.bubble.you') ){
            if( d.textContent == msg ) return true;
          } // for( const d of document.querySelectorAll() ){
        }, 'sample_message123')).toBe(true);
      }); //   it('Verify partner message - Should return true', async()=>{



    }); // describe('sendMessage()', () => {






    describe('connectRoom()', () => {
      it('Vtest', async()=>{

      });

    }); // describe('connectRoom()', () => {




  }); // describe('socket.js', () => {





/*
    it('temp timeout..', async() => {
      await new Promise(resolve => setTimeout(resolve, 600000));
    }); // it('Should return object with data key', async() => {
*/


}); // describe('Client Side Services', () => {
