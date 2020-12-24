/* ################ Controller ################ */
import ctrlSocketDev from '../../controller/utils/socket.mjs';
import ctrlLib from '../../controller/lib.mjs';

/* ################ Socket.io ################ */
import io from 'socket.io-client';

/* ################ TDD ################ */
import expect from 'expect';

/* ################ Logs ################ */
import log from 'fancy-log';


describe('Socket.io Services', ()=> {
  before(()=>{
    // get dev sockets
    const sockets = ctrlSocketDev.createDevSockets(io);
    global.devSocket = sockets.client;
    global.devSocketPartner = sockets.partner;

    const config = ctrlLib.getConfig();
    global.clientPartner = config.test.user[1];
    global.testRoom = config.test.room;
  }); // before( async ()=>{


  describe('connectRoom()', ()=>{
    it('Successfully connect - Should return object with _id', done=>{
      devSocket.on('connectRoom result', roomDetails=>{
        devSocket.off('connectRoom result');

        expect(roomDetails).toEqual(
            expect.objectContaining({_id: expect.anything()}),
        ); // expect(roomDetails).toEqual(

        setTimeout(() => {done();}, 1000); // <-- dont delete timeout
      }); // devSocket.on('connectRoom result', roomDetails=>{

      devSocket.emit('room connect', testRoom);
    }); // it('Successfully connect - Should return object with _id', (done)=>{


    it('Simulate wrong Room ID', done=>{
      devSocket.on('connectRoom result', roomDetails=> {
        devSocket.off('connectRoom result');

        expect(roomDetails).toMatchObject(
            {code: 'Can not find Room ID in Database'},
        ); // expect(roomDetails).toMatchObject(

        done();
      }); // devSocket.on('connectRoom result', roomDetails=> {

      devSocket.emit('room connect', 'wrong_roomID');
    }); // it('Simulate wrong Room ID', done=>{


    it('Simulate NPE - Should return {code: "NPE"}', done=>{
      devSocket.on('connectRoom result', roomDetails=>{
        devSocket.off('connectRoom result');
        expect(roomDetails).toMatchObject({code: 'NPE'});
        done();
      }); // devSocket.on('connectRoom result', (roomDetails)=>{

      devSocket.emit('room connect', null);
    }); // t('Simulate NPE - Should return {code: "NPE"}', done=>{
  }); // describe('connectRoom()', ()=>{


  describe('messageRoom()', ()=>{
    it('Should send message to chat partner and return string', done=>{
      devSocket.on('msg', msg=>{
        devSocket.off('msg');
        expect(typeof msg).toBe('string');
        done();
      }); // devSocket.on('msg', (msg)=>{

      // simulate chat partner message
      devSocketPartner.emit('chat message', {
        msg: 'sample message..',
        room: testRoom,
        usertoken: clientPartner.token,
        date: 'xx/xx/xxxx, xx:xx xx',
      }); // devSocketPartner.emit('chat message', {
    }); // it('Should send message to chat partner and return string', (done)=>{


    it('Simulate null message', done=>{
      devSocket.on('msg', msg=>{
        devSocket.off('msg');
        expect(msg).toStrictEqual({code: 'Message was null'});
        done();
      }); // devSocket.on('msg', (msg)=>{

      // simulate chat partner message
      devSocketPartner.emit('chat message', {
        msg: '',
        room: testRoom,
        usertoken: clientPartner.token,
      }); // devSocketPartner.emit('chat message', {
    }); // it('Simulate null message', done=>{
  }); // describe('messageRoom()', ()=>{
}); // describe('Socket.io Services', ()=>{
