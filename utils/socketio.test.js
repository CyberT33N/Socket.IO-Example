      const fs = require('fs'),
   json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),
  test_client1 = json_config.test.user[0],
  test_client2 = json_config.test.user[1],
     test_room = json_config.test.room,
          host = json_config.test.host + ':' + json_config.test.port,

            io = require('socket.io-client'),

        expect = require('expect'),

           log = require('fancy-log'),
chalkAnimation = require('chalk-animation'),
      gradient = require('gradient-string'),
         chalk = require('chalk');

var socket;






describe('Socket.io Services', ()=>{


  before(async ()=>{

    // client 1
    socket = io.connect(`${host}/?usertoken=${test_client1.token}`, {
      transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

    // client 2
    socket2 = io.connect(`${host}/?usertoken=${test_client2.token}`, {
      transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

  }); //   before( async ()=>{








  describe('connectRoom()', ()=>{


    it('Successfully connect - Should return object with _id', (done)=>{
      socket.on('connectRoom result', (roomDetails)=>{
      //log('connectRoom result - Successfully connect - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('connectRoom result');
        expect( roomDetails ).toEqual(expect.objectContaining({ _id: expect.anything() }));
        done();

      }); //  socket.on('connectRoom result', (roomDetails)=>{

      socket.emit('room connect', test_room);
    }); // it('Successfully connect - Should return object with _id', (done)=>{



    it('Simulate wrong Room ID - Should return {code : "Can not find Room ID in Database"}', (done)=>{
      socket.on('connectRoom result', (roomDetails)=>{
      log('connectRoom result - Simulate wrong Room ID - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('connectRoom result');
        expect( roomDetails ).toMatchObject({code : "Can not find Room ID in Database"});
        done();

      }); // socket.on('connectRoom result', (roomDetails)=>{

      socket.emit('room connect', "wrong_roomID");
    }); // it('Simulate wrong Room ID - Should return "Can not find Room ID in Database"', (done)=>{


    it('Simulate NPE - Should return {code: "NPE"}', (done)=>{
      socket.on('connectRoom result', (roomDetails)=>{
      log('connectRoom result - Simulate NPE - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('connectRoom result');
        expect( roomDetails ).toMatchObject({code : "NPE"});
        done();

      }); // socket.on('connectRoom result', (roomDetails)=>{

      socket.emit('room connect', null);
    }); // it('Simulate NPE - Should return {code: "NPE"}', (done)=>{


  }); // describe('connectRoom()', ()=>{










  describe('messageRoom()', ()=>{


    it('Should send message to chat partner and return string', (done)=>{
      socket.on('msg', (msg)=>{
      log('messageRoom() - sucess message: ' + msg);

        socket.off('msg');
        expect( typeof msg ).toBe( 'string' );
        done();

      }); // socket.on('msg', (msg)=>{

      // simulate chat partner with socket 2
      socket2.emit('chat message', {msg: "sample message..", room: test_room, usertoken: test_client2.token, date: "xx/xx/xxxx, xx:xx xx" });
    }); // it('Should send message to chat partner and return string', (done)=>{



    it('Simulate null message - Should return {code: "Message was null"}', (done)=>{
      socket.on('msg', (msg)=>{
      log('messageRoom() - error message: ' + JSON.stringify(msg, null, 4));

        socket.off('msg');
        expect( msg ).toStrictEqual( {code: "Message was null"} );
        done();

      }); // socket.on('msg', (msg)=>{

      // simulate chat partner with socket 2
      socket2.emit('chat message', {msg: '', room: test_room, usertoken: test_client2.token});
    }); // it('Should return {code: "Message was null"}', (done)=>{


  }); // describe('messageRoom()', ()=>{










}); // describe('Socket.io Services', ()=>{
