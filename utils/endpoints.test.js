      const fs = require('fs'),
   json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),

          host = json_config.test.host + ':' + json_config.test.port,
  test_client1 = json_config.test.user[0],
  test_client2 = json_config.test.user[1],
     test_room = json_config.test.room,

        expect = require('expect'),

         axios = require('axios'),

           log = require('fancy-log'),
chalkAnimation = require('chalk-animation'),
      gradient = require('gradient-string'),
         chalk = require('chalk');









describe('Endpoints Services', ()=>{





  describe('getUserDetails()', ()=>{

    it('Send POST request with User Token - Should return object with _id', async()=>{
      try{

        const r = await axios.post(  host + '/api/getUserDetails', { usertoken: test_client1.token }, {
          headers: { authorization: 'sample_auth_token..' }
        });
        log( 'getUserDetails() - response: ' + JSON.stringify(r?.data, null, 4) );

        expect( r?.data ).toEqual(expect.objectContaining({ _id: expect.anything() }));

      } catch (e){ log( 'getUserDetails() - error: ' + e ); }
    }); // it('Send POST request with User Token - Should return object with _id', async()=>{


    it('Send POST request with wrong User Token - Should return { msg: "User Token was not found in Database" }', async()=>{
      try{ r = await axios.post(  host + '/api/getUserDetails', { usertoken: "wrong_token" }, { headers: { authorization: 'sample_auth_token..' }});
      } catch (e){ expect( e.toString() ).toBe( 'Error: Request failed with status code 403' ); }
    }); // it('Send POST request with wrong User Token - Should return { msg: "User Token was not found in Database" }', async()=>{


    it('Simulate NPE - Should return { msg: "User Token can not be null" }', async()=>{
      try{ await axios.post(  host + '/api/getUserDetails', { usertoken: null }, { headers: { authorization: 'sample_auth_token..' }});
      } catch (e){ expect( e.toString() ).toBe( 'Error: Request failed with status code 404' ); }
    }); // it('Simulate NPE - Should return { msg: "User Token can not be null" }', async()=>{

  }); // describe('getUserDetails', ()=>{











  describe('getRoomDetails()', ()=>{

    it('Send POST request with Room ID - Should return object with _id', async()=>{
      try{

        const r = await axios.post(  host + '/api/getRoomDetails', { id: test_room }, {
          headers: { authorization: 'sample_auth_token..' }
        });
        //log( '#1 getRoomDetails() - response: ' + JSON.stringify(r?.data, null, 4) );

        expect( r?.data ).toEqual(expect.objectContaining({ _id: expect.anything() }));

      } catch (e){ log( 'getRoomDetails() - error: ' + e ); }
    }); // it('Send POST request with Room ID - Should return object with _id', async()=>{


    it('Send POST request with wrong Room ID - Should return { msg: "Room ID was not found in Database" }', async()=>{
      try{ await axios.post(  host + '/api/getRoomDetails', { id: test_room }, {headers: { authorization: 'sample_auth_token..' }});
      } catch (e){ expect( e.toString() ).toBe( 'Error: Request failed with status code 403' ); }
    }); // it('Send POST request with wrong Room ID - Should return { msg: "Room ID was not found in Database" }', async()=>{


    it('Simulate NPE - Should return { msg: "Room ID can not be null" }', async()=>{
      try{ await axios.post(  host + '/api/getRoomDetails', { id: null }, { headers: { authorization: 'sample_auth_token..' }});
      } catch (e){ expect( e.toString() ).toBe( 'Error: Request failed with status code 404' ); }
    }); // it('Simulate NPE - Should return { msg: "Room ID can not be null" }', async()=>{

  }); // describe('getRoomDetails', ()=>{




}); // describe('Endpoints Services', ()=>{
