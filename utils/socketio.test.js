      const fs = require('fs'),
   json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),
  test_client1 = json_config.test.user[0],
  test_client2 = json_config.test.user[1],
     test_room = json_config.test.room,

            io = require('socket.io-client'),

        expect = require('expect'),

           log = require('fancy-log'),
chalkAnimation = require('chalk-animation'),
      gradient = require('gradient-string'),
         chalk = require('chalk');
var socket;






describe('Socket.io Services', () => {


  // client 1
  socket = io.connect(`http://localhost:1337/?usertoken=${test_client1.token}`, {
    transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
  });


  // client 2
  socket2 = io.connect(`http://localhost:1337/?usertoken=${test_client2.token}`, {
    transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
  });










  describe('connectChat()', () => {



    it('Successfully connect - Should return object with _id', (done) => {

      socket.on('connectChat result', function(UserDetails) {
      log('connectChat result - Successfully connect - UserDetails: ' + JSON.stringify(UserDetails, null, 4));

        socket.off('connectChat result');
        expect( UserDetails ).toEqual(expect.objectContaining({ _id: expect.anything() }));
        done();

      }); // socket.on('connectChat result', function(UserDetails) {

      socket.emit('chat connect', {"usertoken": test_client1.token});

    }); // it('connectChat result', (done) => {




    it('Simulate wrong User Token - Should return {code: "Can not find User Token in Database"}', (done) => {

      socket.on('connectChat result', function(UserDetails) {
      log('connectChat result - Simulate wrong User Token - UserDetails: ' + JSON.stringify(UserDetails, null, 4));

        socket.off('connectChat result');
        expect( UserDetails ).toMatchObject({code : "Can not find User Token in Database"});
        done();

      }); // socket.on('connectChat result', function(UserDetails) {

      socket.emit('chat connect', {"usertoken": "wrong_token"});

    }); // it('connectChat result', (done) => {


    it('Simulate NPE - Should return {code: "NPE"}', (done) => {

      socket.on('connectChat result', function(UserDetails) {
      log('connectChat result - Simulate NPE - UserDetails: ' + JSON.stringify(UserDetails, null, 4));

        socket.off('connectChat result');
        expect( UserDetails ).toMatchObject({code : "NPE"});
        done();

      }); // socket.on('connectChat result', function(UserDetails) {

      socket.emit('chat connect', {"usertoken": null});

    }); // it('Simulate NPE - Should return {code: "NPE"}', (done) => {

  }); // describe('connectChat()', () => {










  describe('getUserDetails()', () => {

    it('Successfully get User Details - Should return object with _id', (done) => {

      socket.on('getUserDetails result', function(UserDetails) {
      log('getUserDetails result - UserDetails: ' + JSON.stringify(UserDetails, null, 4));

        socket.off('getUserDetails result');
        expect( UserDetails ).toEqual(expect.objectContaining({ _id: expect.anything() }));
        done();

      }); // socket.on('getUserDetails result', function(UserDetails) {

      socket.emit('getUserDetails', test_client1.token);

    }); // it('Successfully get User Details - Should return object with _id', (done) => {


    it('Simulate wrong User Token - Should return {code: "Can not find User Token in Database"}', (done) => {

      socket.on('getUserDetails result', function(UserDetails) {
      log('getUserDetails result - UserDetails: ' + JSON.stringify(UserDetails, null, 4));

        socket.off('getUserDetails result');
        expect( UserDetails ).toMatchObject({code : "Can not find User Token in Database"});
        done();

      }); // socket.on('getUserDetails result', function(UserDetails) {

      socket.emit('getUserDetails', 'wrong_token');

    }); // it('Simulate wrong User Token - Should return {code: "Can not find User Token in Database"}', (done) => {


    it('Simulate NPE - Should return {code: "NPE"}', (done) => {

      socket.on('getUserDetails result', function(UserDetails) {
      log('getUserDetails result - UserDetails: ' + JSON.stringify(UserDetails, null, 4));

        socket.off('getUserDetails result');
        expect( UserDetails ).toMatchObject({code : "NPE"});
        done();
    
      }); // socket.on('getUserDetails result', function(UserDetails) {

      socket.emit('getUserDetails', null);

    }); // it('Simulate NPE - Should return {code: "NPE"}', (done) => {

  }); // describe('getUserDetails()', () => {










  describe('getRoomDetails()', () => {


    it('Successfully get Room Details - Should return object with _id', (done) => {

      socket.on('chat getRoomDetails result', function(roomDetails) {
      log('chat getRoomDetails result - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('chat getRoomDetails result');
        expect( roomDetails ).toEqual(expect.objectContaining({ _id: expect.anything() }));
        done();

      }); // socket.on('connectChat result', function(UserDetails) {

      socket.emit('chat getRoomDetails', test_room);

    }); // it('chat getRoomDetails result', (done) => {




    it('Simulate wrong Room ID - Should return null', (done) => {

      socket.on('chat getRoomDetails result', function(roomDetails) {
      log('chat getRoomDetails result - Simulate wrong Room ID - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('chat getRoomDetails result');
        expect( roomDetails ).toBe(null);
        done();

      }); // socket.on('connectChat result', function(UserDetails) {

      socket.emit('chat getRoomDetails', "wrong_roomID");

    }); // it('chat getRoomDetails result', (done) => {



    it('Simulate NPE - Should return {code: "NPE"}', (done) => {

      socket.on('chat getRoomDetails result', function(roomDetails) {
      log('chat getRoomDetails result - Simulate NPE - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('chat getRoomDetails result');
        expect( roomDetails ).toMatchObject({code : "NPE"});
        done();

      }); // socket.on('connectChat result', function(UserDetails) {

      socket.emit('chat getRoomDetails', null);

    }); // it('Simulate NPE - Should return {code: "NPE"}', (done) => {

  }); // describe('getRoomDetails()', () => {










  describe('connectRoom()', () => {



    it('Successfully connect - Should return object with _id', (done) => {

      socket.on('connectRoom result', function(roomDetails) {
      log('connectRoom result - Successfully connect - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('connectRoom result');
        expect( roomDetails ).toEqual(expect.objectContaining({ _id: expect.anything() }));
        done();

      }); // socket.on('connectRoom result', function(roomDetails) {

      socket.emit('room connect', test_room);

    }); // it('Successfully connect - Should return object with _id', (done) => {



    it('Simulate wrong Room ID - Should return {code : "Can not find Room ID in Database"}', (done) => {

      socket.on('connectRoom result', function(roomDetails) {
      log('connectRoom result - Simulate wrong Room ID - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('connectRoom result');
        expect( roomDetails ).toMatchObject({code : "Can not find Room ID in Database"});
        done();

      }); // socket.on('connectRoom result', function(roomDetails) {

      socket.emit('room connect', "wrong_roomID");

    }); // it('Simulate wrong Room ID - Should return "Can not find Room ID in Database"', (done) => {


    it('Simulate NPE - Should return {code: "NPE"}', (done) => {

      socket.on('connectRoom result', function(roomDetails) {
      log('connectRoom result - Simulate NPE - roomDetails: ' + JSON.stringify(roomDetails, null, 4));

        socket.off('connectRoom result');
        expect( roomDetails ).toMatchObject({code : "NPE"});
        done();

      }); // socket.on('connectRoom result', function(roomDetails) {

      socket.emit('room connect', null);

    }); // it('Simulate NPE - Should return {code: "NPE"}', (done) => {

  }); // describe('connectRoom()', () => {










  describe('messageRoom()', () => {

    it('Should send message to chat partner and return string', (done) => {

      socket.on('msg', function(msg) {
      log('messageRoom() - sucess message: ' + msg);

        socket.off('msg');
        expect( typeof msg ).toBe( 'string' );
        done();

      }); // socket.on('connectRoom result', function(roomDetails) {

      // simulate chat partner with socket 2
      socket2.emit('chat message', {msg: "sample message..", room: test_room, usertoken: test_client2.token});


    }); // it('Successfully connect - Should return object with _id', (done) => {



    it('Simulate null message - Should return {code: "Message was null"}', (done) => {

      socket.on('msg', function(msg) {
      log('messageRoom() - error message: ' + JSON.stringify(msg, null, 4));

        socket.off('msg');
        expect( msg ).toStrictEqual( {code: "Message was null"} );
        done();

      }); // socket.on('msg', function(msg) {

      // simulate chat partner with socket 2
      socket2.emit('chat message', {msg: '', room: test_room, usertoken: test_client2.token});

    }); // it('Should return {code: "Message was null"}', (done) => {

  }); // describe('messageRoom()', () => {






















}); // describe('Socket.io Services', () => {
