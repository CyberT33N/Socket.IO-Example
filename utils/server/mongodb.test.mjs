/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';

/* ################ TDD ################ */
import expect from 'expect';

/* ################ Controller ################ */
import ctrlMongoDB from '../../controller/mongodb.mjs';


describe('MongoDB Services', ()=>{
  before(()=>{
    const config = ctrlLib.getConfig();
    global.clientMe = config.test.user[0];
    global.testRoom = config.test.room;
  }); // before(()=>{


  describe('connect()', ()=>{
    it('Connect to MongoDB Database - Should return true', async ()=>{
      expect(await ctrlMongoDB.connect()).toEqual(
          expect.objectContaining({
            db: expect.any(Object),
            client: expect.any(Object),
          }), // expect.objectContaining({
      ); // expect(await ctrlMongoDB.connect()).toEqual(
    }); // it('Connect to MongoDB Database - Should return true', async ()=>{


    xit('Error while try to connect to MongoDB Database', async ()=>{
      expect( await ctrlMongoDB.connect() ).toBe(false);
    }); // xit('Error while try to connect to MongoDB Database', async ()=>{
  }); // describe('connect()', ()=>{


  describe('storeMessages()', ()=>{
    it('Simulate NPE - Should return {"msg": "NPE"}', async ()=>{
      expect(
          await ctrlMongoDB.storeMessages({
            'msg': null,
            'room': '1234',
            'usertoken': 'a',
          }), // await ctrlMongoDB.storeMessages({
      ).toStrictEqual( {code: 'NPE'} ); // expect(
    }); // it('Simulate NPE - Should return {"msg": "NPE"}', async ()=>{


    it('Simulate not existing Room ID', async ()=>{
      expect(
          await ctrlMongoDB.storeMessages({
            'msg': 'sample message..',
            'room': 'wrong_room_ID',
            'usertoken': clientMe.token,
          }), // await ctrlMongoDB.storeMessages({
      ).toStrictEqual( {code: 'ROOM ID NOT FOUND'} ); // expect(
    }); // it('Simulate not existing Room ID', async()=>{


    it('Successfully updating of field', async ()=>{
      expect(
          await ctrlMongoDB.storeMessages({
            'msg': 'sample message..',
            'room': testRoom,
            'usertoken': clientMe.token,
          }), // await ctrlMongoDB.storeMessages({
      ).toStrictEqual( {code: 'SUCCESS'} ); // expect(
    }); // it('Successfully updating of field', async ()=>{


    xit('Simulate error while updating of field', async ()=>{
      expect(
          await ctrlMongoDB.storeMessages({
            'msg': 'sample message..',
            'room': testRoom,
            'usertoken': clientMe.token,
          }), // await ctrlMongoDB.storeMessages({
      ).toStrictEqual( {code: 'ERROR'} ); // expect(
    }); // xit('Simulate error while updating of field', async ()=>{
  }); // describe('storeMessages()', ()=>{


  describe('getUserDetails()', ()=>{
    it('Check if User can be found by token', async ()=>{
      expect(
          typeof await ctrlMongoDB.getUserDetails(clientMe.token),
      ).toBe('object'); // expect(
    }); // it('Check if User can be found by token', async ()=>{

    it('Simulate User not found by token', async ()=>{
      expect( await ctrlMongoDB.getUserDetails('wrong_token') ).toBe(null);
    }); // it('Simulate User not found by token', async ()=>{

    it('Simulate NPE - Should return false', async ()=>{
      expect(
          await ctrlMongoDB.getUserDetails(null),
      ).toStrictEqual({code: 'User Token can not be undefined'}); // expect(
    }); // it('Simulate NPE - Should return false', async ()=>{
  }); // describe('getUserDetails()', ()=>{


  describe('getRoomDetails()', ()=>{
    it('Check if User can be found by token', async ()=>{
      expect(typeof await ctrlMongoDB.getRoomDetails(testRoom)).toBe('object');
    }); // it('Check if User can be found by token', async ()=>{


    it('Simulate User not found by token', async ()=>{
      expect( await ctrlMongoDB.getRoomDetails('wrong_roomID') ).toBe(null);
    }); // it('Simulate User not found by token', async ()=>{


    it('Simulate NPE - Should return false', async ()=>{
      expect(
          await ctrlMongoDB.getRoomDetails(null),
      ).toStrictEqual({code: 'Room ID can not be undefined'}); // expect(
    }); // it('Simulate NPE - Should return false', async ()=>{
  }); // describe('getRoomDetails()', ()=>{
}); // describe('mongodb service', ()=>{
