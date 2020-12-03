/*################ Controller ################*/
import controllerSocketIO from '../controller/socketio.mjs';

/*################ Socket.io ################*/
import io_client from 'socket.io-client';

/*################ TDD ################*/
import expect from 'expect';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';

/*################ config.json ################*/
import fs from 'fs';
import yaml from 'js-yaml';
const json_config = yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8')),
     test_client2 = json_config.test.user[1],
        test_room = json_config.test.room;

var devSocket, devSocketPartner;






describe('Socket.io Services', ()=>{

  before(done=>{(async()=>{
    // get dev sockets
       const sockets = await controllerSocketIO.createDevSockets(io_client);
           devSocket = sockets.devSocket;
    devSocketPartner = sockets.devSocketPartner;

    done();
  })()}); // before( async ()=>{




  describe('connectRoom()', ()=>{

    it('Successfully connect - Should return object with _id', done=>{
      devSocket.on('connectRoom result', roomDetails=>{ //log('connectRoom result - Successfully connect - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        devSocket.off('connectRoom result');
        expect( roomDetails ).toEqual(expect.objectContaining({ _id: expect.anything() }));
        setTimeout(() => { done(); }, 1000); // <-- dont delete timeout

      }); //  devSocket.on('connectRoom result', (roomDetails)=>{

      devSocket.emit('room connect', test_room);
    }); // it('Successfully connect - Should return object with _id', (done)=>{



    it('Simulate wrong Room ID - Should return {code : "Can not find Room ID in Database"}', done=>{
      devSocket.on('connectRoom result', roomDetails=>{
      //log('connectRoom result - Simulate wrong Room ID - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        devSocket.off('connectRoom result');
        expect( roomDetails ).toMatchObject({code : "Can not find Room ID in Database"});
        done();

      }); // devSocket.on('connectRoom result', (roomDetails)=>{
      devSocket.emit('room connect', "wrong_roomID");
    }); // it('Simulate wrong Room ID - Should return "Can not find Room ID in Database"', (done)=>{


    it('Simulate NPE - Should return {code: "NPE"}', done=>{
      devSocket.on('connectRoom result', roomDetails=>{
      log('connectRoom result - Simulate NPE - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        devSocket.off('connectRoom result');
        expect( roomDetails ).toMatchObject({code : "NPE"});
        done();

      }); // devSocket.on('connectRoom result', (roomDetails)=>{

      devSocket.emit('room connect', null);
    }); // it('Simulate NPE - Should return {code: "NPE"}', (done)=>{


  }); // describe('connectRoom()', ()=>{










  describe('messageRoom()', ()=>{

    it('Should send message to chat partner and return string', done=>{
      devSocket.on('msg', msg=>{
      log('messageRoom() - sucess message: ' + msg);

        devSocket.off('msg');
        expect( typeof msg ).toBe( 'string' );
        done();

      }); // devSocket.on('msg', (msg)=>{

      // simulate chat partner with socket 2
      devSocketPartner.emit('chat message', {msg: "sample message..", room: test_room, usertoken: test_client2.token, date: "xx/xx/xxxx, xx:xx xx" });
    }); // it('Should send message to chat partner and return string', (done)=>{



    it('Simulate null message - Should return {code: "Message was null"}', done=>{
      devSocket.on('msg', msg=>{
      log('messageRoom() - error message: ' + JSON.stringify(msg, null, 4));

        devSocket.off('msg');
        expect( msg ).toStrictEqual( {code: "Message was null"} );
        done();

      }); // devSocket.on('msg', (msg)=>{

      // simulate chat partner with socket 2
      devSocketPartner.emit('chat message', {msg: '', room: test_room, usertoken: test_client2.token});
    }); // it('Should return {code: "Message was null"}', (done)=>{


  }); // describe('messageRoom()', ()=>{







}); // describe('Socket.io Services', ()=>{
