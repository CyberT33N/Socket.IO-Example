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

    controllerbot = require('../controller/controller-bot'),
controllermongodb = require('../controller/controller-mongodb'),

              log = require('fancy-log'),
   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk');

var pptr;













describe('Client Side Services', () => {


  before( async () => {

    // start browser and get page & client
    pptr = await controllerbot.startBROWSER();
    if(!pptr) throw new Error('Something went wrong we cant find pptr');
    //log( 'startBROWSER() done..' );

    await openLink(pptr.page, link);
    //log( 'openLink() done..' );

    await connectMongoDB();

  }); // before( async () => {








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






    describe('getChatPartner()', () => {


      it('Should return object with key _id', async()=>{

        const roomDetails = await getRoomDetails(test_room);

        if(roomDetails?._id){
        //log( 'getChatPartner() - Room Details: ' + JSON.stringify(roomDetails, null, 4) );

          const r = await pptr.page.evaluate(async(d)=>{
            return await getChatPartner(d.roomDetails, d.usertoken);
          }, {"roomDetails": roomDetails, "usertoken": test_client1.token});
          //log('getChatPartner() - Chat Partner usertoken: ' + r?.usertoken);

          expect( r ).toEqual(expect.objectContaining({ usertoken: expect.anything() }));

        } // if(roomDetails){
        else throw new Error('getChatPartner() - Cant get Room Details');

      }); // it('Should return object with key _id', async()=>{


      it('Simulate NPE - Should return false', async()=>{

          expect( await pptr.page.evaluate(async(d)=>{
            return await getChatPartner(d.roomDetails, d.usertoken);
          }, {"roomDetails": null, "usertoken": test_client1.token})).toBe(false);

      }); // it('Simulate NPE - Should return false', async()=>{


    }); // describe('getChatPartner()', () => {






    describe('getFriends()', () => {

      it('Should return object with key _id', async()=>{

        const userDetails = await getUserDetails(test_client1.token);

        if(userDetails?._id){
        log( 'getFriends() - User Details: ' + JSON.stringify(userDetails, null, 4) );

          expect( await pptr.page.evaluate(async(userDetails)=>{
            return await getFriends(userDetails);
          }, userDetails)).toBe(true);

        } // if(roomDetails){
        else throw new Error('getFriends() - Cant get User Details');

      }); // it('Should return object with key _id', async()=>{


      it(`Search for CSS Selector .person[data-room="${test_room}"] - Should return true`, async()=>{

          expect( await pptr.page.evaluate(async(roomID)=>{
            return document.querySelector(`.person[data-room="${roomID}"]`)?.outerHTML;
          }, test_room)).toBeTruthy();

      }); // it('Should return object with key _id', async()=>{


      it('Simulate NPE - Should return false', async()=>{

          expect( await pptr.page.evaluate(async(userDetails)=>{
            return await getFriends(userDetails);
          }, null)).toBe(false);

      }); // it('Simulate NPE - Should return false', async()=>{

    }); // describe('getFriends()', () => {





  }); // describe('web.js', () => {





/*
    it('temp timeout..', async() => {
      await new Promise(resolve => setTimeout(resolve, 600000));
    }); // it('Should return object with data key', async() => {
*/


}); // describe('Client Side Services', () => {











// create function to create loop if something went wrong like timeout to restart
async function openLink(page, link){ if( !await controllerbot.openLink(page, link) ) return await openLink(page, link); };
