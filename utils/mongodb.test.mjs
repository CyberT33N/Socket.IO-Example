/*################ TDD ################*/
import expect from 'expect';

/*################ Controller ################*/
import controllermongodb from '../controller/mongodb.mjs';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';

/*################ config.json ################*/
import fs from 'fs';
import yaml from 'js-yaml';
const json_config = yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8')),
     test_client1 = json_config.test.user[0],
        test_room = json_config.test.room;




describe('MongoDB Services', ()=>{



  describe('connect()', ()=>{

    it('Connect to MongoDB Database - Should return true', async()=>{
      expect( await controllermongodb.connect() ).toEqual(expect.objectContaining({
        db: expect.any(Object),
        client: expect.any(Object),
      }));
    });

    xit('Error while try to connect to MongoDB Database - Should return false', async()=>{
      expect( await controllermongodb.connect() ).toBe(false);
    });

  }); // describe('connect()()', ()=>{





  describe('storeMessages()', ()=>{

    it('Simulate NPE - Should return {"msg": "NPE"}', async()=>{
      expect( await controllermongodb.storeMessages({"msg": null,"room": "1234", "usertoken": "a"}) ).toStrictEqual( {code: "NPE"} );
    });

    it('Simulate not existing Room ID - Should return {"msg": "ROOM ID NOT FOUND"}', async()=>{
      expect( await controllermongodb.storeMessages({"msg": "sample message..", "room": "wrong_room_ID", "usertoken": test_client1.token}) ).toStrictEqual( {code: "ROOM ID NOT FOUND"} );
    });

    it('Successfully updating of field - Should return {code : "SUCCESS"}', async()=>{
      expect( await controllermongodb.storeMessages({"msg": "sample message..", "room": test_room, "usertoken": test_client1.token}) ).toStrictEqual( {code : "SUCCESS"} );
    });

    xit('Simulate error while updating of field - Should return {code : "ERROR"}', async()=>{
      expect( await controllermongodb.storeMessages({"msg": "sample message..", "room": test_room, "usertoken": test_client1.token}) ).toStrictEqual( {code : "ERROR"} );
    });

  }); // describe('storeMessages()', ()=>{





  describe('getUserDetails()', ()=>{

    it('Check if User can be found by token - Should return object', async()=>{
      expect( typeof await controllermongodb.getUserDetails(test_client1.token) ).toBe('object');
    });

    it('Simulate User not found by token - Should return null', async()=>{
      expect( await controllermongodb.getUserDetails('wrong_token') ).toBe(null);
    });

    it('Simulate NPE - Should return false', async()=>{
      expect( await controllermongodb.getUserDetails(null) ).toStrictEqual( {code : "User Token can not be undefined"} );
    });

  }); // describe('getUserDetails()', ()=>{






  describe('getRoomDetails()', ()=>{

    it('Check if User can be found by token - Should return object', async()=>{
      expect( typeof await controllermongodb.getRoomDetails(test_room) ).toBe('object');
    });

    it('Simulate User not found by token - Should return null', async()=>{
      expect( await controllermongodb.getRoomDetails('wrong_roomID') ).toBe(null);
    });

    it('Simulate NPE - Should return false', async()=>{
      expect( await controllermongodb.getRoomDetails(null) ).toStrictEqual( {code : "Room ID can not be undefined"} );
    });

  }); // describe('getRoomDetails()', ()=>{





}); // describe('mongodb service', ()=>{
